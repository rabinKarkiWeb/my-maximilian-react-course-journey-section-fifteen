
import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from "../../hooks/use-http";

const NewTask = (props) => {

  const {isLoading ,error ,sendRequest:sendTaskRequest} = useHttp();
  const CreateTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };
    props.onAddTask(createdTask);
  }
  const enterTaskHandler =  (taskText) => {
     sendTaskRequest(
        {
          url:'https://react-custom-hooks-cd020-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json',
          method:'POST',
          headers:{
            'Content-Type': 'application/json',
          },
          body:{ text: taskText },
        },CreateTask.bind(null,taskText)
    );
  //   try {
  //     const response = await fetch(
  //       'https://react-custom-hooks-cd020-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json',
  //
  //       {
  //         method: 'POST',
  //         body: JSON.stringify({ text: taskText }),
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );
  //
  //     if (!response.ok) {
  //       throw new Error('Request failed!');
  //     }
  //
  //     const data = await response.json();
  //
  //     const generatedId = data.name; // firebase-specific => "name" contains generated id
  //     const createdTask = { id: generatedId, text: taskText };
  //
  //     props.onAddTask(createdTask);
  //   } catch (err) {
  //     setError(err.message || 'Something went wrong!');
  //   }
  //   setIsLoading(false);
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
