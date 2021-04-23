# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:
-keep class io.agora.**{*;}
-keep public class com.dylanvann.fastimage.* {*;}
-keep public class com.dylanvann.fastimage.** {*;}
-keep public class * implements com.bumptech.glide.module.GlideModule
-keep public class * extends com.bumptech.glide.module.AppGlideModule
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }
-keep public enum com.bumptech.glide.load.ImageHeaderParser$** {
  **[] $VALUES;
  public *;
}

-keepattributes *Annotation*
-dontwarn com.razorpay.**
-keep class com.razorpay.** {*;}
-optimizations !method/inlining/
-keepclasseswithmembers class * {
  public void onPayment*(...);
}
-keep public class com.horcrux.svg.** {*;}

-optimizationpasses 5
-dontusemixedcaseclassnames
-dontskipnonpubliclibraryclasses
-dontpreverify
-verbose
-optimizations !code/simplification/arithmetic,!field/*,!class/merging/*,!method/inlining/*
-useuniqueclassmembernames

-keep public class * extends android.app.Activity
-keep public class * extends android.app.Application
-keep public class * extends android.app.Service
-keep public class * extends android.content.BroadcastReceiver
-keep public class * extends android.content.ContentProvider
-keep public class * extends android.app.backup.BackupAgentHelper
-keep public class * extends android.preference.Preference


-dontwarn us.zoom.thirdparty.**
-dontwarn com.google.firebase.**
-dontwarn com.nineoldandroids.**
-dontwarn us.google.protobuf.**

-dontwarn us.zoom.videomeetings.BuildConfig
-dontwarn us.zoom.androidlib.BuildConfig
-dontwarn com.bumptech.glide.**
-dontwarn com.google.gson.**
-dontwarn com.zipow.videobox.ptapp.PTAppProtos.**
-dontwarn com.zipow.videobox.ptapp.PTAppProtos**
-dontwarn org.greenrobot.eventbus.**
-dontwarn com.zipow.videobox.ptapp.MeetingInfoProto**
-dontwarn com.zipow.videobox.ZMFirebaseMessagingService
-dontwarn com.zipow.videobox.util.ConfLocalHelper**
-dontwarn com.zipow.videobox.util.RoundedCornersTransformation**
-dontwarn com.davemorrissey.labs.subscaleview.**
-dontwarn com.zipow.videobox.view.mm.UnshareAlertDialogFragment**
-dontwarn com.zipow.videobox.util.zmurl.avatar.ZMAvatarUrl**
-dontwarn com.android.internal.R$styleable**


-keep class  com.zipow.videobox.share.IDrawingViewListener {*;}
-keep class com.zipow.videobox.share.IColorChangedListener {*;}
-keep class com.zipow.videobox.sdk.SDKShareUnit {*;}
-keep class com.zipow.videobox.kubi.IKubiService {*;}
-keep class us.zoom.androidlib.util.ParamsList{*;}
-keep class com.zipow.videobox.IPTService{*;}
-keep class com.zipow.videobox.util.**{*;}
-keep class com.zipow.videobox.view.video.AbsVideoScene{*;}
-keep class com.zipow.videobox.sdk.SDKVideoUnit{*;}
-keep class us.zoom.androidlib.util.**
-keep class us.zoom.internal.**{*;}
-keep class us.zipow.mdm.**{*;}
-keep ,includedescriptorclasses class com.zipow.videobox.sdk.SDKVideoView {*;}

-dontnote us.zoom.androidlib.app.ZMActivity
-dontnote us.zoom.androidlib.util.UIUtil
-dontnote us.zoom.androidlib.util.DnsServersDetector
-dontnote org.apache.**
-dontnote org.json.**
-dontnote com.zipow.videobox.view.mm.**
-dontnote com.zipow.videobox.view.sip.**
-dontnote com.davemorrissey.labs.**

-keep class com.zipow.videobox.view.video.ZPGLTextureView**{
    *;
}
-keep class ZMActivity.** { *;}
-keep class us.zoom.androidlib.util.UIUtil {  *;}


-keep class com.zipow.videobox.util.BuildTarget {
	*;
}

-dontwarn com.facebook.android.**
-dontwarn android.hardware.**
-dontwarn android.media.**
-dontwarn android.widget.**
-dontwarn com.zipow.videobox.**
-dontwarn us.zoom.androidlib.**
-dontwarn us.zoom.thirdparty.**
-dontwarn com.google.firebase.**

-dontwarn com.box.**

-keep class com.box.** {
	*;
}

-dontwarn com.dropbox.**
-keep class com.dropbox.** {
	*;
}

-dontwarn org.apache.**
-keep class org.apache.** {
    *;
}

-keep class org.json.** {
    *;
}

-keepattributes *Annotation*
-keepattributes Signature

-keepnames class com.fasterxml.jackson.** {
	*;
}

-dontwarn com.fasterxml.jackson.databind.**

-dontwarn com.google.android.gms.**
-keep class com.google.android.gms.** {
 	*;
}

-dontwarn com.google.api.client.**
-keep class com.google.api.client.** {
	*;
}

-dontwarn com.microsoft.live.**
-keep class com.microsoft.live.** {
	*;
}

-dontwarn com.baidu.**
-keep class com.baidu.** {
	*;
}

-keep class com.google.api.services.** {
	*;
}

-keep class com.google.android.** {
	*;
}

-keep class sun.misc.Unsafe { *; }

-keep class com.google.gson.** {
    *;
}

-dontwarn androidx.**
-keep class androidx.** {
    *;
}
-keep class us.google.protobuf.** {
    *;
}

-keep class com.bumptech.glide.** {
    *;
}
-dontwarn com.bumptech.glide.**

-keep class us.zoom.androidlib.app.ZMLocalFileListAdapter {
	*;
}

-keep class us.zoom.androidlib.app.ZMFileListEntry{*;}

-keep class us.zoom.androidlib.util.DefaultNameAbbrGenerator {
	*;
}

-keep class com.zipow.videobox.util.ZoomAccountNameValidator {
	*;
}

-keep class com.zipow.videobox.stabilility.NativeCrashHandler {
	*;
}

-dontwarn com.zipow.google_login.GoogleAuthActivity

-keep class us.zoom.net.** {
    *;
}

-keep public class com.zipow.annotate.** {
    *;
}

-keep public class com.zipow.cmmlib.** {
    *;
}

-keep public class com.zipow.nydus.** {
    *;
}

-keep class com.zipow.videobox.util.BuildTarget {
	*;
}

-keep class com.zipow.videobox.util.ZoomAccountNameValidator {
	*;
}

-keep class com.zipow.videobox.stabilility.NativeCrashHandler {
	*;
}

-keep class com.zipow.videobox.ptapp.** {
    *;
}

-keep class com.zipow.videobox.confapp.** {
    *;
}

-keep class com.zipow.videobox.mainboard.** {
    *;
}

-keep class com.zipow.videobox.pdf.** {
    *;
}

-keep class org.webrtc.voiceengine.** {
    *;
}

-keep class us.google.protobuf.** {
    *;
}

-keep class android.support.** {
    *;
}

-dontwarn android.support.**

-keepclasseswithmembernames class * {
    native <methods>;
}

-keepclasseswithmembers class * {
    public <init>(android.content.Context, android.util.AttributeSet);
}

-keepclasseswithmembers class * {
    public <init>(android.content.Context, android.util.AttributeSet, int);
}

-keepclassmembers class * extends android.app.Activity {
   public void *(android.view.View);
}

-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}

-keep class * implements android.os.Parcelable {
  public static final android.os.Parcelable$Creator *;
}
# Jisti Meet SDK

-keep class org.jitsi.meet.** { *; }
-keep class org.jitsi.meet.sdk.** { *; }

# We added the following when we switched minifyEnabled on. Probably because we
# ran the app and hit problems...

-keep class com.facebook.react.bridge.CatalystInstanceImpl { *; }
-keep class com.facebook.react.bridge.ExecutorToken { *; }
-keep class com.facebook.react.bridge.JavaScriptExecutor { *; }
-keep class com.facebook.react.bridge.ModuleRegistryHolder { *; }
-keep class com.facebook.react.bridge.ReadableType { *; }
-keep class com.facebook.react.bridge.queue.NativeRunnable { *; }
-keep class com.facebook.react.devsupport.** { *; }

-dontwarn com.facebook.react.devsupport.**
-dontwarn com.google.appengine.**
-dontwarn com.squareup.okhttp.**
-dontwarn javax.servlet.*
