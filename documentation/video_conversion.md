# Videos conversion

To convert the starting page videos

on linux use this command:
FFMPEG_PATH="C:\ffmpeg\bin\ffmpeg" FFPROBE_PATH="C:\ffmpeg\bin\ffprobe" node video_convertor

on windows using the command line:
set FFMPEG_PATH=production
set FFPROBE_PATH=production
node video_convertor

on windows using the power shell:
$env:FFMPEG_PATH="C:\ffmpeg\bin\ffmpeg.exe"
$env:FFPROBE_PATH="C:\ffmpeg\bin\ffprobe.exe"
node video_convertor