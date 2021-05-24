import React, { useState, useContext } from "react";
import {
  Collapse,
  Button,
  Input,
  Modal,
  Form,
  Alert,
  Popconfirm,
  message,
  Tooltip,
} from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { GlobalContext } from "../Context/GlobalState";
//import {v4 as uuid} from 'uuid';

export default function Questions() {
  const { questions, addQuestion, editQuestion, deleteQuestion } =
    useContext(GlobalContext);
  const [flag, setFlag] = useState(false);
  const [id, setId] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState("required");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editedAnswer, setEditAnswer] = useState("");
  const [editedQues, setEditQuestion] = useState("");
  const [quesFlag, setQuesFlag] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [showEoorMsg, setShowErrorMsg] = useState(false);
  const { Panel } = Collapse;

  //Calling function onclick of edit icon and storing values
  function editAnswer(value) {
    setId(value.id); 
    setEditQuestion(value.question); 
    setFlag(true); //making flag as true to display input field
  }
  function panelClick() {
    setFlag(false);//Hiding the input field onclick of panel
  }
  //To open the modal
  function openModal() {
    setQuesFlag(false);
    setIsModalVisible(true); 
  }
  const handleCancel = () => {
    setIsModalVisible(false); //Closing modal onclick of cancel button
  };
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  function handleQuestion(e) {
    setShowErrorMsg(false);
    setQuestion(e.target.value); //assigning question input value 
  }
  function handleAnswer(e) {
    setAnswer(e.target.value); //assigning answer input value 
  }
  function handleEditAnswer(e) {
    setEditAnswer(e.target.value); //assigning edited answer's input value 
  }
  //Calling function onclick of create button in modal
  const handleOk = () => {
    if (question !== "") {
      let obj = {
        //"id": uuid(),
        id: question.length + 1,
        question: question,
        answer: answer,
      };
      setQuesFlag(true); // to display success alert box
      setTimeout(() => {
        setQuesFlag(false); // to hide success alert box after 2.5 secs
      }, 2500);
      addQuestion(obj); // adding question object to array
      setIsModalVisible(false); // close modal
    } else {
      setShowErrorMsg(true); // display error message if question input is empty
    }
  };
  //To submit the edited answer
  function updateAns() {
    let obj = {
      id: id,
      question: editedQues,
      answer: editedAnswer,
    };
    editQuestion(obj); //sending updated answer's object
    var x = document.querySelectorAll(".ant-collapse-item-active");
    if (x.length) {
      for (var i = 0; i < x.length; i++) {
        setTimeout(function () {
          var el = document.querySelector(".ant-collapse-item-active");
          el.children[0].click();
        }, 100);
      }
    }
  }
  //to delete the question based on id
  function confirm(e) {
    deleteQuestion(deleteId); //sending question id
    message.success("Deleted Successfully");
  }

  function cancel(e) {
    message.error("Canceled");
  }
  function removeQuestion(value) {
    setDeleteId(value.id);
  }
  return (
    <div>
      {quesFlag && (
        <div>
          <Alert
            style={{ width: "40%", float: "right",marginTop:'-3.5%' }}
            message="Question Added Successfully"
            description="Thank you for adding a question!"
            type="success"
            showIcon
            closable
          />
        </div>
      )}
      <br></br>
      <div>
      <span style={{ fontSize: "23px", fontWeight: "600" }}>Frequently Asked Questions!</span>
        <Collapse accordion onChange={() => panelClick()} style={{ marginTop: "5%" }}>
          {questions &&
            questions.map((value, i) => (
              <Panel
                header={
                  <>
                    <span>{value.question}</span>
                    <Popconfirm
                      title="Are you sure to delete this question?"
                      onConfirm={confirm}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Tooltip title="Delete">
                        <DeleteTwoTone
                          onClick={() => removeQuestion(value)}
                          style={{ float: "right" }}
                        />
                      </Tooltip>
                    </Popconfirm>
                  </>
                }
                key={i}
              >
                {!flag && (
                  <>
                    <span>{value.answer}</span>
                    <Tooltip title="Edit">
                      <span
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                        onClick={() => editAnswer(value)}
                      >
                        <EditTwoTone />
                      </span>
                    </Tooltip>
                  </>
                )}
                {flag && (
                  <>
                    <Input
                      style={{ width: "90%" }}
                      defaultValue={value.answer}
                      onChange={(e) => handleEditAnswer(e)}
                    />
                    <Button type="primary" onClick={() => updateAns()}>
                      Update
                    </Button>
                  </>
                )}
              </Panel>
            ))}
        </Collapse>
        <Button
          type="primary"
          onClick={() => openModal()}
          style={{ left: "50%", marginTop: "5%" }}
        >
          Add
        </Button>
        <Modal
          title="Add a New Question"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Create"
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              requiredMarkValue: requiredMark,
            }}
            onValuesChange={onRequiredTypeChange}
            requiredMark={requiredMark}
          >
            <Form.Item label="Question" required>
              <Input
                placeholder="Question"
                onChange={(e) => handleQuestion(e)}
              />
              {showEoorMsg && (
                <span style={{ color: "red" }}>Please enter a Question!</span>
              )}
            </Form.Item>
            <Form.Item label="Answer">
              <Input placeholder="Answer" onChange={(e) => handleAnswer(e)} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}
