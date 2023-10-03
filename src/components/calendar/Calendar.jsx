import { useState } from 'react'

import { months, years } from '~/constant'

import Container from '~/components/Container'
import Select from '~/components/inputs/Select'

import CalendarContent from './CalendarContent'
import CalendarHead from './CalendarHead'

const Calendar = () => {
  const [year, setYear] = useState({
    value: new Date().getFullYear(),
    label: new Date().getFullYear(),
  });
  const [month, setMonth] = useState({
    value: new Date().getMonth(),
    label: months.find((month) => month.value === new Date().getMonth())?.label,
  });

  return (
    <>
      <div className="flex flex-row w-full items-center justify-end gap-4">
        <Select
          value={year}
          placeholder="Tahun"
          options={years}
          onChange={(value) => setYear(value)}
        />
        <Select
          value={month}
          placeholder="Bulan"
          options={months}
          onChange={(value) => setMonth(value)}
        />
      </div>
      <Container>
        <CalendarHead />
        <CalendarContent month={month?.value} year={year?.value} />
      </Container>
    </>
  );
};

export default Calendar;
