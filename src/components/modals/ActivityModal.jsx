import {
  useEffect,
  useMemo,
  useState,
} from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import useActivityModal from '~/hooks/useActivityModal'
import useDateActivities from '~/hooks/useDateActivities'

import Input from '~/components/inputs/Input'

import Modal from './Modal'

const ActivityModal = () => {
  const activityModal = useActivityModal();
  const { addActivity, updateActivity } = useDateActivities();

  const [isLoading, setIsLoading] = useState(false);

  const isCreate = useMemo(
    () => activityModal.isCreate,
    [activityModal.isCreate]
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(
      yup
        .object({
          name: yup.string().required(),
          email: yup
            .string()
            .email('Email must be a valid email')
            .required('Email is required'),
          time: yup.string().required(),
        })
        .required()
    ),
    defaultValues: {
      name: '',
      email: '',
      time: '',
    },
  });

  useEffect(() => {
    if (activityModal.detail?.activity) {
      const period = activityModal.detail?.activity?.period;
      let timeSplit = activityModal.detail?.activity?.time.split(':');
      let hours = parseInt(timeSplit[0]);
      let minutes = parseInt(timeSplit[1]);
      if (period === 'PM' && timeSplit[0] === 12) {
        hours = 0;
      } else if (period === 'PM' && hours !== 12) {
        hours += 12;
      }
      const time =
        hours.toString().padStart(2, '0') +
        ':' +
        minutes.toString().padStart(2, '0');
      setCustomValue('name', activityModal.detail?.activity?.name);
      setCustomValue('email', activityModal.detail?.activity?.email);
      setCustomValue('time', time);
    }
    return () => {
      reset();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activityModal.detail]);

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit = (data) => {
    setIsLoading(true);

    let timeSplit = data.time.split(':'),
      hours,
      minutes,
      meridian;

    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = 'PM';
      hours -= 12;
    } else if (hours < 12) {
      meridian = 'AM';
      if (hours == 0) {
        hours = 12;
      }
    } else {
      meridian = 'PM';
    }

    if (isCreate) {
      addActivity(activityModal.detail?.selectedDate, {
        ...data,
        time: hours + ':' + minutes,
        period: meridian,
      });
    } else {
      updateActivity(
        activityModal.detail?.selectedDate,
        activityModal.detail?.index,
        {
          ...data,
          time: hours + ':' + minutes,
          period: meridian,
        }
      );
    }
    activityModal.onClose();
    setIsLoading(false);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        id="name"
        label="Activity"
        placeholder="Activity"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        type="email"
        label="Email"
        placeholder="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="time"
        label="Time"
        type="time"
        placeholder="Time"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={activityModal.isOpen}
      title={isCreate ? 'Add Activity' : 'Update Activity'}
      actionLabel={isCreate ? 'Save' : 'Update'}
      onClose={activityModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    ></Modal>
  );
};

export default ActivityModal;
