import ExerciseList from '@/components/backoffice/exercises/ExerciseList';
import { Layout } from '@/components/layouts';

const ExercisesPage = () => {
    return (
        <Layout title="Exercise - Gym">
            <ExerciseList />
        </Layout>
    )
}

export default ExercisesPage;