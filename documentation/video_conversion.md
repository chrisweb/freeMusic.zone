# Videos conversion

To be able to convert new videos to use them on the homepage, you need to create two versions of the video, an mp4 encoded one and a webm encoded one.

### Server setup

I use am amazon aws ec2 instance to install the video convertor and the required tools like ffmpeg.

If you also want to use amazon aws, you can use the cloud-config userdata script "cloud-config-video-audio-harvester.txt" that is in the cloud/cloud-init/userdata directory of this project, to create a new ec2 instance.

### Uploading the videos

I have installed the video convertor on an amazon aws instance.

Open your FTP tool (I use Filezilla).

Create a new server.
Put the ec2 instances "public dns" (something.eu-west-1.compute.amazonaws.com) address into the host field.
As protocol chose SFTP.
Choose as logon type normal.
In the user field add "ec2-user", you don't need to enter a password.

Now open Edit (Preferences) > Settings > Connection > SFTP.
Click "Add key file".
Browse to the location of your .pem file and select it. Filezilla will automatically convert it to a ppk file.

That's it, now you can connect to the ec2 instance and upload the videos into the videos directory "/var/www/freeMusic.zone/videos".

### Launch the conversion script

To convert the "homepage" videos

go into the root directory of the project "/var/www/freeMusic.zone"

on linux use this command:
sudo FFMPEG_PATH="C:\ffmpeg\bin\ffmpeg" FFPROBE_PATH="C:\ffmpeg\bin\ffprobe" node video_convertor

on windows using the command line:
set FFMPEG_PATH=production
set FFPROBE_PATH=production
node video_convertor

on windows using the power shell:
$env:FFMPEG_PATH="C:\ffmpeg\bin\ffmpeg.exe"
$env:FFPROBE_PATH="C:\ffmpeg\bin\ffprobe.exe"
node video_convertor