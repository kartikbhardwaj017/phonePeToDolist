

let ToDo = require('./entities/ToDo');
let {TaskFilter} = require('./entities/TaskFilter');
let app = new ToDo();

let user = app.addUser('kartik');

let task1 = app.addTask('Drink water at 12pm', new Date("2026-11-10"), ['health'], user);
let task2 = app.addTask('Jog at 12pm', new Date("2026-11-11"), ['wealth'], user);
let task3= app.addTask('wake up at 7am', new Date("2026-11-26"), ['health'], user, new Date("2026-11-25"));

app.markCompleted(task1.id, user);

let tasks =app.getTasks(user);


let tasks2 = app.getTasks(user,new TaskFilter(null,null,['wealth']));

console.log(tasks);
console.log(tasks2);

console.log(app.getStatistics(user, new Date("2026-11-13"), new Date("2026-11-16")));
// console.log(app.getActivityLog(user, new Date("2026-11-10"), new Date("2026-11-20")));


