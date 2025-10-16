import HOME from '../pages/home.jsx';
import SUBJECT_SELECTION from '../pages/subject-selection.jsx';
import PRACTICE_MODE from '../pages/practice-mode.jsx';
import CHAPTER_LIST from '../pages/chapter-list.jsx';
import QUESTION_PRACTICE from '../pages/question-practice.jsx';
export const routers = [{
  id: "home",
  component: HOME
}, {
  id: "subject-selection",
  component: SUBJECT_SELECTION
}, {
  id: "practice-mode",
  component: PRACTICE_MODE
}, {
  id: "chapter-list",
  component: CHAPTER_LIST
}, {
  id: "question-practice",
  component: QUESTION_PRACTICE
}]