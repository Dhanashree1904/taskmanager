import clsx from "clsx";
import React, { useState } from "react";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { BGS, PRIOTITYSTYLES, TASK_TYPE, formatDate } from "../utils";
import TaskDialog from "./task/TaskDialog";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import UserInfo from "./UserInfo";
import { IoMdAdd } from "react-icons/io";
import AddSubTask from "./task/AddSubTask";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TaskCard = ({ task }) => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='w-full h-fit bg-white shadow-md p-4 rounded'>
        <div className='w-full flex justify-between'>
          <div
            className={clsx(
              "flex flex-1 gap-1 items-center text-sm font-medium",
              PRIOTITYSTYLES[task?.priority]
            )}
          >
            <span className='text-lg'>{ICONS[task?.priority]}</span>
            <span className='uppercase'>{task?.priority} Priority</span>
          </div>

          {<TaskDialog task={task} />}
        </div>

        <>
          <div className='flex items-center gap-2'>
            <div
              className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
            />
            <h4 className='line-clamp-1 text-black'>{task?.title}</h4>
          </div>
          <span className='text-sm text-gray-600'>
            Created On: {formatDate(new Date(task?.date))}
          </span>
          <br />
          <span className="text-sm text-gray-600">
            Deadline: {formatDate(new Date(task?.deadline))}
          </span>
        </>

        <div className='w-full border-t border-gray-200 my-2' />
        <div className='flex items-center justify-between mb-2'>
          <div className='flex items-center gap-3'>
            <div className='flex gap-1 items-center text-sm text-gray-600'>
              <BiMessageAltDetail />
              <span>{task?.activities?.length}</span>
            </div>
            <div className='flex gap-1 items-center text-sm text-gray-600 '>
              <MdAttachFile />
              <span>{task?.assets?.length}</span>
            </div>
            <div className='flex gap-1 items-center text-sm text-gray-600 '>
              <FaList />
              <span>0/{task?.subTasks?.length}</span>
            </div>
          </div>

          <div className='flex flex-row-reverse'>
            {task?.team?.map((m, index) => (
              <div
                key={index}
                className={clsx(
                  "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                  BGS[index % BGS?.length]
                )}
              >
                <UserInfo user={m} />
              </div>
            ))}
          </div>
        </div>

        {/* sub tasks */}
        {task?.subTasks?.length > 0 ? (
          <div className="py-4 border-t border-gray-200">
            {task.subTasks.map((subTask, index) => (
              <div key={index} className="mb-4">
                <h5 className="text-base line-clamp-1 text-black">
                  {subTask.title}
                </h5>
                <div className="p-4 space-y-2">

                  <span className="text-sm text-gray-600">
                    Deadline: {formatDate(new Date(subTask?.deadline))}
                  </span>
                  <br />
                  <span className="bg-blue-600/10 px-3 py-1 rounded-full text-blue-700 font-medium">
                    {subTask.tag}
                  </span>
                  
                </div>
                {/*<div className='py-2'>
                  <span className='text-sm font-medium'>Team:</span>
                    <div className='flex gap-2 mt-1'>
                      {subTask.team.map((member) => (
                        <div
                          key={member._id}
                          className='bg-gray-200 px-3 py-1 rounded-md text-sm text-gray-700'
                        >
                          {member.name}
                        </div>
                      ))}
                    </div>
                </div>*/}
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className='py-4 border-t border-gray-200'>
              <span className='text-gray-500'>No Sub Task</span>
            </div>
          </>
        )}

        <div className='w-full pb-2'>
          <button
            onClick={() => setOpen(true)}
            
            className='w-full flex gap-4 items-center text-sm text-gray-500 font-semibold disabled:cursor-not-allowed disabled::text-gray-300'
          >
            <IoMdAdd className='text-lg' />
            <span>ADD SUBTASK</span>
          </button>
        </div>
      </div>

      <AddSubTask open={open} setOpen={setOpen} id={task._id} />
    </>
  );
};

export default TaskCard;