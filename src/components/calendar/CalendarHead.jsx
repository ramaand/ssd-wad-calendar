import { days } from '~/constant'

const CalendarHead = () => {
  return (
    <div className="w-full grid grid-cols-7 ">
      {days.map((day) => (
        <div
          key={day}
          className="w-full py-4 px-8 text-center text-white bg-slate-800 select-none"
        >
          {day}
        </div>
      ))}
    </div>
  );
};

export default CalendarHead;
