/* eslint-disable */

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAmxControlService } from "../../hooks/amxControlService";
import eventBus from "../../lib/eventBus";

const AmxNxIcon = (props) => {
    const amxControlService = useAmxControlService();
    const [iconConfig, setIconConfiguration] = useState(null);
    const iconRef = useRef(null);
    const [isInitialized, setInitialized] = useState(false);

    useEffect(() => {
        if (iconConfig && !isInitialized) {
            setInitialized(true);
            bindEvent();
        }

        return () => {
            eventBus.remove('channel.event');
        };
    }, [iconConfig]);

    useEffect(() => {
        let icon = props.configuration ? props.configuration : {};
        if (icon.port === undefined) {
            icon.port = 1;
        }
        if (icon.channel === undefined) {
            icon.channel = 1;
        }
        icon.labelVisible === undefined || icon.labelVisible
            ? (icon.labelVisible = true)
            : (icon.labelVisible = false);
        if (icon.text === undefined) {
            icon.text = 'Label';
        }
        icon.initText = icon.text 

        iconRef.current = icon;
        setIconConfiguration(icon);
    }, [props.configuration]);

    const bindEvent = useCallback(() => {
        eventBus.on('channel.event', (data) => {
          const icon = Object.assign({}, iconRef.current);
          if (parseInt(data.port) === parseInt(icon.port)) {
            if (parseInt(icon.channel) === parseInt(data.channel)) {
              switch (data.event) {
                case 'text': {
                  if (data.newText !== undefined && data.newText !== '') {
                    icon.text = data.newText;
                  } else if (icon.initText !== icon.text || data.newText === '') {
                    icon.text = cb.initText;
                  }
                  break;
                }

                case 'icon': {
                    icon.icon = data.icon;
                    break;
                }
              }
              iconRef.current = cb;
              setIconConfiguration(cb);
            }
          }
        });
      });

    if(!iconConfig) return null;

    return (
        <div className="d-flex justify-content-center align-items-center flex-column">
            {iconConfig.labelVisible && <div className="heading-xs">{iconConfig.text}</div> }
            {iconConfig.icon && <i className={`bi ${iconConfig.icon} fs-1`}></i> }
        </div>
    )
}

export default AmxNxIcon;