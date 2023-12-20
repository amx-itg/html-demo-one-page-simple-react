/* eslint-disable */
import React, { useEffect, useState } from 'react';
import AmxNxLevel from '../../components/AmnxLevel';
import AmxNxButton from '../../components/AmxNxButton';
import AmxNxIcon from '../../components/AmxNxIcon';
import AmNxPresetButtons from '../../components/AmNxPresetButtons';
import AmxNxVolumeControls from '../../components/AmxNxVolumeControls';
import eventBus from '../../lib/eventBus';

const DashboardPage = () => {

  const [btnGridConfig] = useState({
    port: 1,
    size: 8, // number of items in on page
    btns: [
      { channel: 502, text: 'Room<br>On', textStyle: 'text-light', style: 'btn-secondary bg-gradient ', icon: 'bi bi-power' },
      { channel: 503, text: 'Room<br>Off', textStyle: 'text-light', style: 'btn-secondary bg-gradient ', icon:"bi bi-power"},
      { channel: 504, text: 'Mic On', style: 'btn-secondary bg-gradient ', icon:"bi bi-mic-fill"},
      { channel: 505, text: 'Mic Off', style: 'btn-secondary bg-gradient ', icon:"bi bi-mic-mute-fill"},
      { channel: 506, text: 'TV On', style: 'btn-secondary bg-gradient', icon:"bi bi-tv-fill"},
      { channel: 507, text: 'TV Off', style: 'btn-secondary bg-gradient', icon:"bi bi-tv"}
    ],
  });

  const [volumeControlConfig] = useState({
    port: 1,
    size: 3, // number of items in on page
    volumes: [
      {
        range: { level: 1, setValue: 255 },
        icon: { channel: 1, labelVisible: true, text: 'Microphone', icon: 'bi-mic' },
        btn: { channel: 512, text: 'Mute', textStyle: 'text-light', style: 'btn-danger rounded' }
      },
      {
        range: { level: 2, setValue: 255 },
        icon: { channel: 2, labelVisible: true, text: 'Speakers', icon: 'bi-volume-up' },
        btn: { channel: 513, text: 'Mute', textStyle: 'text-light', style: 'btn-success rounded' }
      }
      // {
      //   range: { level: 1, setValue: 255 },
      //   icon: { channel: 1, labelVisible: true, text: 'Microphone', icon: 'bi-mic' },
      //   btn: { channel: 514, text: 'Mute', textStyle: 'text-light', style: 'bg-danger rounded' }
      // },
      // {
      //   range: { level: 1, setValue: 255 },
      //   icon: { channel: 1, labelVisible: true, text: 'Label', icon: 'bi-volume-up' },
      //   btn: { channel: 515, text: 'Mute', textStyle: 'text-light', style: 'bg-success rounded' }
      // }
    ]
  })

  return (
    <>
      <div className="row mx-auto g-0 justify-content-center">
        <div className='col-md-12'>
          <AmNxPresetButtons configuration={btnGridConfig}/>
        </div>
      </div>

      <div className="row mx-auto g-0 justify-content-center mt-5">
        <div className='col-md-12'>
          <AmxNxVolumeControls configuration={volumeControlConfig}/>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
