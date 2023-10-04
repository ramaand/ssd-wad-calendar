import { useMemo } from 'react'

import PropTypes from 'prop-types'

import { days } from '~/constant'
import useActivityModal from '~/hooks/useActivityModal'
import useDateActivities from '~/hooks/useDateActivities'
import useDeleteDialog from '~/hooks/useDeleteDialog'
import { cn, getDayName } from '~/lib/utils'

import RenderIf from '~/components/RenderIf'

import AddActivity from './AddActivity'
import CellItem from './CellItem'

const CalendarContent = ({ month, year, showActivityButton }) => {
  const activityModal = useActivityModal();
  const deleteDialog = useDeleteDialog();

  const dates = useMemo(() => {
    const calendar = [];

    let currentDate = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const firstDayOfMonth = new Date(year, month, 1);
    // const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayName = getDayName(firstDayOfMonth);
    // const lastDayName = getDayName(lastDayOfMonth);

    const skipFirstDayOfMonthCount = days.findIndex(
      (day) => day === firstDayName
    );

    for (let i = 1 - skipFirstDayOfMonthCount; i <= daysInMonth; i++) {
      if (i <= 0) {
        calendar.push(null);
      } else {
        calendar.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    return calendar;
  }, [month, year]);

  const { dateActivities } = useDateActivities();

  const handleAddActivity = (selected) => {
    activityModal.detail = { selectedDate: selected };
    activityModal.onOpen();
  };

  const handleUpdateActivity = (selected, activity, activityIndex) => {
    activityModal.detail = {
      selectedDate: selected,
      activity,
      index: activityIndex,
    };
    activityModal.setEdit();
    activityModal.onOpen();
  };

  const handleDeleteActivity = (selected, activity, activityIndex) => {
    deleteDialog.detail = {
      selectedDate: selected,
      activity,
      index: activityIndex,
    };
    deleteDialog.onOpen();
  };

  const getActivities = (date) => {
    return dateActivities[date?.toISOString().split('T')[0]] || [];
  };

  return (
    <div>
      <div className="grid grid-cols-7">
        {dates.map((day, i) => (
          <div
            key={i}
            className={cn(
              'border-gray-300 p-2 group min-h-[6rem]',
              day && 'border',
              day &&
                getActivities(day)?.length < 3 &&
                !showActivityButton &&
                'cursor-pointer'
            )}
            onClick={(e) => {
              e.stopPropagation();
              if (
                day &&
                getActivities(day)?.length < 3 &&
                !showActivityButton
              ) {
                handleAddActivity(day);
              }
            }}
          >
            <p className="mb-2 font-semibold">{day?.getDate()}</p>
            <RenderIf isTrue={getActivities(day)?.length}>
              <ul className="text-white flex flex-col gap-2">
                {getActivities(day).map((activity, activityIndex) => (
                  <CellItem
                    key={activity.name + activityIndex}
                    activity={activity}
                    onDelete={(e) => {
                      e.stopPropagation();
                      handleDeleteActivity(day, activity, activityIndex);
                    }}
                    onUpdate={(e) => {
                      e.stopPropagation();
                      handleUpdateActivity(day, activity, activityIndex);
                    }}
                  />
                ))}
              </ul>
            </RenderIf>
            <RenderIf
              isTrue={
                day && getActivities(day)?.length < 3 && showActivityButton
              }
            >
              <AddActivity
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddActivity(day);
                }}
              />
            </RenderIf>
          </div>
        ))}
      </div>
    </div>
  );
};

CalendarContent.propTypes = {
  month: PropTypes.number,
  year: PropTypes.number,
  showActivityButton: PropTypes.bool,
};

export default CalendarContent;
