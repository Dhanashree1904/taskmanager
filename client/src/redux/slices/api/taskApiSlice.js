import { apiSlice } from "../apiSlice";

const TASKS_URL = "/task";

export const taskApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardStats: builder.query({
            query: () => ({
                url: `${TASKS_URL}/dashboard`,
                method: "GET",
                credentials: "include",
            }),
        }),

        getAllTasks: builder.query({
            query: ({ strQuery, isTrashed, search }) => ({
                url: `${TASKS_URL}?stage=${strQuery}&isTrashed=${isTrashed}&search=${search}`,
                method: "GET",
                credentials: "include",
            }),
        }),

        createTask: builder.mutation({
            query: (data) => ({
                url: `${TASKS_URL}/create`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),

        duplicateTask: builder.mutation({
            query: (id) => ({
                url: `${TASKS_URL}/duplicate/${id}`,
                method: "POST",
                body: {},
                credentials: "include",
            }),
        }),

        updateTask: builder.mutation({
            query: (data) => ({
                url: `${TASKS_URL}/update/${data._id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),

        trashTask: builder.mutation({
            query: ({id, isTrashed}) => ({
                url: `${TASKS_URL}/${id}`,
                method: "PUT",
                body: {isTrashed},
                credentials: "include",
            }),
        }),

        createSubTask: builder.mutation({
            query: ({data, id}) => ({
                url: `${TASKS_URL}/create-subtask/${id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),

        getSingleTask: builder.query({
            query: (id) => ({
                url: `${TASKS_URL}/${id}`,
                method: "GET",
                credentials: "include",
            }),
        }),

        postTaskActivity: builder.mutation({
            query: ({data , id}) => ({
                url: `${TASKS_URL}/activity/${id}`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),
    }),
});

export const {
    useGetDashboardStatsQuery, 
    useGetAllTasksQuery,
    useCreateTaskMutation,
    useDuplicateTaskMutation,
    useUpdateTaskMutation,
    useTrashTaskMutation,
    useCreateSubTaskMutation,
    useGetSingleTaskQuery,
    usePostTaskActivityMutation,
} = taskApiSlice