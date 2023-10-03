import create from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const useDateActivities = create(
  persist(
    (set) => ({
      dateActivities: {},
      addActivity: (date, newData) =>
        set((state) => {
          date = date.toISOString().split('T')[0];

          if (!state.dateActivities[date]) {
            state.dateActivities[date] = [];
          }

          if (state.dateActivities[date].length < 3) {
            state.dateActivities[date].push({...newData});
          }

          return { dateActivities: { ...state.dateActivities } };
        }),

      updateActivity: (date, indexActivity, updatedData) =>
        set((state) => {
          date = date.toISOString().split('T')[0];
          const activities = state.dateActivities[date];

          if (activities) {
            activities[indexActivity] = { ...activities[indexActivity], ...updatedData };
          }

          return { dateActivities: { ...state.dateActivities } };
        }),

      removeActivity: (date, indexActivity) =>
        set((state) => {
          date = date.toISOString().split('T')[0];
          const activities = state.dateActivities[date];

          if (activities) {
            activities.splice(indexActivity, 1);
          }

          return { dateActivities: { ...state.dateActivities } };
        }),

      getActivities: (date) => {
        date = date.toISOString().split('T')[0];
        return (state) => (state.dateActivities[date] || []).slice();
      },
    }),
    {
      name: 'date-activites-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default useDateActivities;
