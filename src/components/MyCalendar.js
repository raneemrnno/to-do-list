import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase_setup/firebase";

export default function MyCalendar() {
  const [events, setEvents] = useState([]);

  const fetchData = async () => {
    const q = query(
      collection(firestore, "tasks"),
      where("user", "==", localStorage.getItem("user"))
    );
    await getDocs(q).then((querySnapshot) => {
      const newData = querySnapshot.docs.map(
        (doc) => doc.data()
        // id: doc.id,
      );

      setEvents(
        newData.map((d) => {
          return { title: d.task, start: d.date };
        })
      );
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      weekends={false}
      events={events}
      eventContent={renderEventContent}
    />
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
