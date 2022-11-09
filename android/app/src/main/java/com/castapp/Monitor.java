package com.castapp;

import com.amazon.whisperplay.fling.media.service.CustomMediaPlayer;
import com.amazon.whisperplay.fling.media.service.MediaPlayerStatus;
import com.amazon.whisperplay.fling.media.service.MediaPlayerStatus.MediaState;
import com.amazon.whisperplay.fling.media.service.MediaPlayerStatus.MediaCondition;
import com.amazon.whisperplay.fling.media.service.CustomMediaPlayer.StatusListener;


class Status {
    public long mPosition;
    public MediaState mState;
    public MediaCondition mCond;
}

public class Monitor implements StatusListener {
    @Override
    public void onStatusChange(MediaPlayerStatus status, long position) {
        Status mStatus = new Status();

        synchronized (mStatus) {
                mStatus.mState  = status.getState();
                mStatus.mCond = status.getCondition();
                mStatus.mPosition = position;
            }
    }

}
