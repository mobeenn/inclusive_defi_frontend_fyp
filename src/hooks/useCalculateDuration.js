import moment from "moment";
import { useCallback, useState, useEffect } from "react";

export default function useCalculateDuration(endDate) {
   const calculateDuration = useCallback((endDate) => {
      const now = moment();
      const end = moment(endDate);
      const duration = moment.duration(end.diff(now));

      const days = Math.floor(duration.asDays());
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();

      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
   }, []);

   const [duration, setDuration] = useState(calculateDuration());

   useEffect(() => {
      const timer = setInterval(() => {
         setDuration(calculateDuration(endDate));
      }, 1000);

      return () => clearInterval(timer);
   }, [calculateDuration, endDate]);

   return duration;
}
