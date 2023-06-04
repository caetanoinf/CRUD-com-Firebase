import { useCallback } from "react";
import { useSession } from "../contexts";
import { db } from "../firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";

const todosCollection = collection(db, "todos");

export function useTodos() {
  const { authenticatedUser } = useSession();

  const getTodos = useCallback(async () => {
    const q = query(todosCollection, where("userId", "==", authenticatedUser.uid), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    const todos = [];

    querySnapshot.forEach((doc) => {
      todos.push({ ...doc.data(), id: doc.id });
    });

    return todos;
  }, [authenticatedUser]);

  const createTodo = useCallback(
    async (todo) => {
      const timestamp = serverTimestamp();
      const doc = { ...todo, timestamp, userId: authenticatedUser.uid };
      return addDoc(todosCollection, doc);
    },
    [authenticatedUser]
  );

  const deleteTodo = useCallback(async (todoId) => {
    return deleteDoc(doc(todosCollection, todoId));
  });

  const updateTodo = useCallback(async (todoId, todo) => {
    return updateDoc(doc(todosCollection, todoId), todo);
  });

  return {
    getTodos,
    createTodo,
    deleteTodo,
    updateTodo,
  };
}
