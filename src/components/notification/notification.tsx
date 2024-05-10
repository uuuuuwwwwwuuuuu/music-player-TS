import React, { FC, useEffect, useRef, useState } from "react";
import './notification.scss';
import { useAppDispatch, useAppSelector } from "../../hook";
import { INotificationData } from "../../store/notificationQueue/reducerNotification";
import { deleteNotification } from "../../store/notificationQueue/actionsNotification";
import { RxCross2 } from "react-icons/rx";

const Notification: FC = () => {
    const notificationList = useAppSelector(state => state.notification);

    return (
        <div className="notification_wrapper">
            {
                notificationList.map(item => {
                    return <NotificationItem key={item.notificationId} notificationData={item} />
                })
            }
        </div>
    )
}

export default Notification;

interface INotificationItemProps {
    notificationData: INotificationData,
}

const NotificationItem: FC<INotificationItemProps> = ({notificationData}) => {
    const {img, info, additionalInfo, notificationId} = notificationData;
    const additionalInfoSpan = useRef<HTMLSpanElement>(null);
    const notificationItem = useRef<HTMLDivElement>(null);
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const dispatch = useAppDispatch();

    useEffect(() => {
        const timerId = setTimeout(() => {
            if (notificationItem.current) {
                notificationItem.current.style.animation = 'notification-fade-out 0.5s ease';

                setTimeout(() => {
                    dispatch(deleteNotification(notificationId));
                }, 495)
            }
        }, 5000);

        return () => void clearTimeout(timerId);
    }, [dispatch]);

    useEffect(() => {
        if (additionalInfoSpan.current) {
            additionalInfoSpan.current.innerHTML = additionalInfo;
        }
    }, [additionalInfo]);

    const handleDelete = () => {
        if (notificationItem.current) {
            notificationItem.current.style.animation = 'notification-fade-out 0.5s ease';
    
            setTimeout(() => {
                dispatch(deleteNotification(notificationId));
            }, 450);
        }
    }

    const deleteBtnOpacity = isDelete ? 1 : 0

    return (
        <div ref={notificationItem} onMouseEnter={() => setIsDelete(true)} onMouseLeave={() => setIsDelete(false)} className="notification">
            {
                typeof img === 'string' 
                    ? <img src={img} alt="Фото" />
                    : <div className="notification_icon">{img}</div>
            }
            
            <div className="notification_data">
                <span className="notification_info">{info}</span>
                <span ref={additionalInfoSpan} className="notification_additional_info">{additionalInfo}</span>
            </div>
            <button onClick={handleDelete} style={{opacity: deleteBtnOpacity}} className="delete_notification">
                <RxCross2 strokeWidth={1}/>
            </button>
        </div>
    )
}