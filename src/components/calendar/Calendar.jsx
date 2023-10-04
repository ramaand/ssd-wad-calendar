import { useState } from 'react'

import { useForm } from 'react-hook-form'

import { months, years } from '~/constant'

import Container from '~/components/Container'
import Select from '~/components/inputs/Select'
import Switch from '~/components/inputs/Switch'

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

  const {
    register,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      useButton: false,
    },
  });

  const isUseButtonChecked = watch('useButton');

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  return (
    <>
      <div className="flex flex-row w-full items-center justify-end gap-4">
        <Switch
          id="useButton"
          label="Use add activity button"
          register={register}
          errors={errors}
          onChange={(e) => setCustomValue('useButton', e.target.checked)}
        />
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
        <CalendarContent
          month={month?.value}
          year={year?.value}
          showActivityButton={isUseButtonChecked}
        />
      </Container>
    </>
  );
};

export default Calendar;
