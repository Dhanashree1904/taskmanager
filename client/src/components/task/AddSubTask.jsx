import React, {useState} from "react";
import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Button from "../Button";
import { useCreateSubTaskMutation } from "../../redux/slices/api/taskApiSlice";
import { toast } from "sonner";
import UserList from "./UserList";
import { dateFormatter } from "../../utils";

const AddSubTask = ({ open, setOpen, id , assignedUsers}) => {
  const { title, deadline, team: initialTeam = [] } = id || {}; 
  const defaultValues = {
      title: title || "",
      tag: "",
      deadline: dateFormatter(id?.deadline || new Date()),
      team: initialTeam,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(defaultValues);

  const [addSubTask] = useCreateSubTaskMutation();
  const [team, setTeam] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOnSubmit = async (data) => {
     try {
      const payload = {
        ...data,
        date: data.deadline, // Map the 'deadline' field to 'date'
        team: team.map((member) => member.value),
      };
       const res = await addSubTask({ data: payload, id }).unwrap();
       toast.success(res.message);
       setTimeout(() => {
         setOpen(false);
       }, 500);
     } catch (err) {
       console.log(err);
       toast.error(err?.data?.message || err.error);
   }
  };

  {/*const handleOnSubmit = async (data) => {

    const payload = {
      ...data,
      date: data.deadline,
      team: team.map((member) => member.value),
    };

    try {
      setIsSubmitting(true);
      const res = await addSubTask({ data: payload, id }).unwrap();
      toast.success(res.message);
      setTimeout(() => {
        setOpen(false);
      }, 500);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create sub-task. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };*/}

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            ADD SUB-TASK
          </Dialog.Title>
          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Sub-Task title'
              type='text'
              name='title'
              label='Title'
              className='w-full rounded'
              register={register("title", {
                required: "Title is required!",
              })}
              error={errors.title ? errors.title.message : ""}
            />

            <UserList setTeam={setTeam} team={team} />

            <div className='flex items-center gap-4'>
              {/* <Textbox
                placeholder='Date'
                type='date'
                name='date'
                label='Task Date'
                className='w-full rounded'
                register={register("date", {
                  required: "Date is required!",
                })}
                error={errors.date ? errors.date.message : ""}
              /> */}
              <Textbox
                placeholder='Tag'
                type='text'
                name='tag'
                label='Comment'
                className='w-full rounded'
                register={register("tag", {
                  required: "Tag is required!",
                })}
                error={errors.tag ? errors.tag.message : ""}
              />
            </div>

            <Textbox
              placeholder='Deadline'
              type='date'
              name='deadline'
              label='Deadline'
              className='w-full rounded'
              register={register("deadline", {
                required: "Deadline is required!",
              })}
              error={errors.deadline ? errors.deadline.message : ""}
            />
            
           { /* <div>
              <label htmlFor="team" className="block text-sm font-medium text-gray-700">
                Select Team
              </label>
              <Select
                options={teamOptions} // Array of { label, value }
                isMulti
                name="team"
                onChange={(selected) => setValue("team", selected)}
                className="w-full mt-1"
              />  
              {errors.team && <p className="text-red-600 text-sm">{errors.team.message}</p>}
            </div> */}
          </div>
          
          <div className='py-3 mt-4 flex sm:flex-row-reverse gap-4'>
            <Button
              type='submit'
              className='bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 sm:ml-3 sm:w-auto'
              label='Add Task'
              //disabled={isSubmitting}
              //label={isSubmitting ? "Adding..." : "Add Task"}
            />

            <Button
              type='button'
              className='bg-white border text-sm font-semibold text-gray-900 sm:w-auto'
              onClick={() => setOpen(false)}
              label='Cancel'
            />
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddSubTask;