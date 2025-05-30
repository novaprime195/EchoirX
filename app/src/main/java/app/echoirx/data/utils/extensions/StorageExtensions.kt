package app.echoirx.data.utils.extensions

import android.content.Context
import android.content.Intent
import android.os.Environment
import androidx.compose.material3.SnackbarHostState
import androidx.core.content.FileProvider
import androidx.core.net.toUri
import androidx.documentfile.provider.DocumentFile
import app.echoirx.R
import kotlinx.coroutines.CoroutineScope
import java.io.File
import java.text.DecimalFormat
import kotlin.math.log10
import kotlin.math.pow

/**
 * Extension functions for handling storage paths and URIs
 */
fun String?.toDisplayPath(context: Context): String {
    return when {
        this == null -> {
            val musicDir =
                Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_MUSIC)
            File(musicDir, "Echoir").path.formatLocalPath()
        }

        this.toUri().scheme == "content" -> {
            val uri = this.toUri()

            val treePath = uri.pathSegments
                .firstOrNull { it.contains(":") }
                ?.substringAfter(":")
                ?.replace("/", File.separator)

            if (treePath != null) {
                if (uri.toString().contains("primary")) {
                    "Internal Storage/$treePath"
                } else {
                    "External Storage/$treePath"
                }
            } else {
                val doc = DocumentFile.fromTreeUri(context, uri)
                if (doc != null) {
                    if (uri.toString().contains("primary")) {
                        "Internal Storage/${doc.name}"
                    } else {
                        "External Storage/${doc.name}"
                    }
                } else {
                    "Internal Storage"
                }
            }
        }

        else -> this.toUri().path ?: this
    }.formatLocalPath()
}

/**
 * Get file size and format it as a human-readable string
 */
fun String?.getFileSize(context: Context): String {
    if (this == null) return ""

    return try {
        val size = when {
            startsWith("content://") -> {
                val uri = this.toUri()
                context.contentResolver.openFileDescriptor(uri, "r")?.use {
                    it.statSize
                } ?: 0L
            }

            else -> File(this).length()
        }

        size.formatFileSize()
    } catch (_: Exception) {
        ""
    }
}

/**
 * Format file size into human readable format
 */
private fun Long.formatFileSize(): String {
    if (this <= 0) return "0 B"

    val units = arrayOf("B", "KB", "MB", "GB")
    val digitGroups = (log10(toDouble()) / log10(1024.0)).toInt()

    val formatter = DecimalFormat("#,##0.#")
    return "${formatter.format(this / 1024.0.pow(digitGroups))} ${units[digitGroups]}"
}

/**
 * Formats a local file system path for better readability
 */
private fun String.formatLocalPath(): String {
    return this.replace("/storage/emulated/0/", "Internal Storage/")
        .replace("//", "/")
        .trim('/')
}

/**
 * Opens an audio file with the system's audio player
 * Returns true if the file was opened successfully, false otherwise
 *
 * @param context The context
 * @param snackbarHostState SnackbarHostState to show error messages
 * @param coroutineScope CoroutineScope to launch snackbar in
 * @return True if file was opened successfully, false otherwise
 */
fun String?.openAudioFile(
    context: Context,
    snackbarHostState: SnackbarHostState,
    coroutineScope: CoroutineScope
): Boolean {
    if (this == null) {
        snackbarHostState.showSnackbar(
            scope = coroutineScope,
            message = context.getString(R.string.msg_file_not_found)
        )
        return false
    }

    return try {
        val uri = when {
            startsWith("content://") -> this.toUri()
            else -> {
                val file = File(this)
                FileProvider.getUriForFile(
                    context,
                    "${context.packageName}.provider",
                    file
                )
            }
        }

        val intent = Intent(Intent.ACTION_VIEW).apply {
            setDataAndType(uri, "audio/*")
            addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
        }

        if (context.packageManager.queryIntentActivities(intent, 0).isNotEmpty()) {
            context.startActivity(Intent.createChooser(intent, null))
            true
        } else {
            snackbarHostState.showSnackbar(
                scope = coroutineScope,
                message = context.getString(R.string.msg_no_player_available)
            )
            false
        }
    } catch (_: Exception) {
        snackbarHostState.showSnackbar(
            scope = coroutineScope,
            message = context.getString(R.string.msg_file_open_failed)
        )
        false
    }
}