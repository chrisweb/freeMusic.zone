# Videos conversion

To be able to convert new videos to use them on the homepage, you need to create two versions of the video, an mp4 encoded one and a webm encoded one.

### Server setup

I use am amazon aws ec2 instance to install the video convertor and the required tools like ffmpeg.

If you also want to use amazon aws, you can use the cloud-config userdata script "cloud-config-video-converter.txt" that is in the cloud/cloud-init/userdata directory of this project, to create a new ec2 instance.

### Uploading the videos

I have installed the video convertor on an amazon aws instance.

Open your FTP tool (I use Filezilla) and then 



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