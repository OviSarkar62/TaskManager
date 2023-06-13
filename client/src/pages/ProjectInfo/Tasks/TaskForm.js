import { DatePicker, Form, Input, message, Modal, Tabs } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddNotification } from "../../../apicalls/notifications";
import { CreateTask, UpdateTask } from "../../../apicalls/tasks";
import { SetLoading } from "../../../redux/loadersSlice";

function TaskForm({
  showTaskForm,
  setShowTaskForm,
  project,
  task,
  reloadData,
}) {
  const [selectedTab = "1", setSelectedTab] = React.useState("1");
  const [email, setEmail] = React.useState("");
  const { user } = useSelector((state) => state.users);
  const formRef = React.useRef(null);
  const [file = null, setFile] = React.useState(null);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      let response = null;
      const assignedToMember = project.members.find(
        (member) => member.user.email === email
      );
      const assignedToUserId = assignedToMember.user._id;
      dispatch(SetLoading(true));
      if (task) {
        // update task
        response = await UpdateTask({
          ...values,
          project: project._id,
          assignedTo: task.assignedTo._id,
          _id: task._id,
        });
      } else {
        const assignedBy = user._id;
        response = await CreateTask({
          ...values,
          project: project._id,
          assignedTo: assignedToUserId,
          assignedBy,
        });
      }

      if (response.success) {
        if (!task) {
          // send notification to the assigned employee
          AddNotification({
            title: `You have been assigned a new task in ${project.name}`,
            user: assignedToUserId,
            onClick: `/project/${project._id}`,
            description: values.description,
          });
        }

        reloadData();
        message.success(response.message);
        setShowTaskForm(false);
      }
      dispatch(SetLoading(false));
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  const validateEmail = () => {
    const employeesInProject = project.members.filter(
      (member) => member.role === "employee"
    );
    const isEmailValid = employeesInProject.find(
      (employee) => employee.user.email === email
    );
    return isEmailValid ? true : false;
  };

  return (
    <Modal
      title={task ? "UPDATE TASK" : "CREATE TASK"}
      open={showTaskForm}
      onCancel={() => setShowTaskForm(false)}
      centered
      onOk={() => {
        formRef.current.submit();
      }}
      okText={task ? "UPDATE" : "CREATE"}
      width={800}
      {...(selectedTab === "2" && { footer: null })}
    >
      <Tabs activeKey={selectedTab} onChange={(key) => setSelectedTab(key)}>
        <Tabs.TabPane tab="Task Details" key="1">
          <Form
            layout="vertical"
            ref={formRef}
            onFinish={onFinish}
            initialValues={{
              ...task,
              assignedTo: task ? task.assignedTo.email : "",
            }}
          >
            <Form.Item
              label="Task Name"
              name="name"
              rules={[
                { required: true, message: "Please enter the task name" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Task Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please enter the task description",
                },
              ]}
            >
              <TextArea />
            </Form.Item>

            <Form.Item
              label="Assign To"
              name="assignedTo"
              rules={[
                { required: true, message: "Please enter the assignee email" },
              ]}
            >
              <Input
                placeholder="Enter email of the employee"
                onChange={(e) => setEmail(e.target.value)}
                disabled={task ? true : false}
              />
            </Form.Item>

            <Form.Item
              label="Due Date"
              name="dueDate"
              rules={[
                { required: true, message: "Please select the due date" },
              ]}
            >
              <DatePicker />
            </Form.Item>

            {email && !validateEmail() && (
              <div className="bg-red-700 text-sm p-2 rounded">
                <span className="text-white">
                  Email is not valid or employee is not in the project
                </span>
              </div>
            )}
          </Form>
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
}

export default TaskForm;
