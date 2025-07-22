import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import axios from '../services/Axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface Todo {
  _id: string;
  task: string;
  duedate: string;
}

interface TaskForm {
  task: string;
  duedate: string;
}

export default function TodoPage() {
  const { user, token, logout, loading } = useAuth();
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [taskLoading, setTaskLoading] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm<TaskForm>();
  const { t } = useTranslation('common');

  const fetchTodos = useCallback(async () => {
    try {
      const res = await axios.get('/todo/get-todos', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(res.data);
    } catch {
      toast.error('Failed to fetch todos');
    }
  }, [token]);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    } else if (!loading && user) {
      fetchTodos();
    }
  }, [user, loading, router, fetchTodos]);

  const onSubmit = async (data: TaskForm) => {
    setTaskLoading(true);
    try {
      if (editingId) {
        await axios.put(`/todo/update-todo/${editingId}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success(t('update_task'));
        setEditingId(null);
      } else {
        await axios.post('/todo/create-todo', data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success(t('add_task'));
      }
      reset();
      fetchTodos();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setTaskLoading(false);
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditingId(todo._id);
    setValue('task', todo.task);
    setValue('duedate', todo.duedate.split('T')[0]);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/todo/delete-todo/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Task deleted');
      fetchTodos();
    } catch {
      toast.error('Failed to delete');
    }
  };

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-600">
            {t('welcome', { name: user.name })}
          </h1>
          <button
            onClick={logout}
            className="text-red-600 hover:underline text-sm"
          >
            {t('logout')}
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
          <input
            {...register('task', { required: true })}
            placeholder={t('task_name')}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="date"
            {...register('duedate', { required: true })}
            className="w-full px-4 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700 transition"
            disabled={taskLoading}
          >
            {taskLoading ? t('loading') : editingId ? t('update_task') : t('add_task')}
          </button>
        </form>

        <div className="space-y-4">
          {todos.length === 0 ? (
            <p className="text-gray-500 text-center">{t('no_tasks')}</p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo._id}
                className="flex justify-between items-center border p-3 rounded-md"
              >
                <div>
                  <p className="font-semibold text-gray-800">{todo.task}</p>
                  <p className="text-sm text-gray-500">
                    {t('due_date')}: {format(new Date(todo.duedate), 'dd MMM yyyy')}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(todo)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {t('update_task')}
                  </button>
                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
