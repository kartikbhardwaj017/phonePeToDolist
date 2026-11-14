const User = require('./User');
const Task = require('./Task');
const { applyFilter, applySort, TaskFilter, SortCriteris } = require('./TaskFilter');
const { calculateStatistics, Statistics } = require('./Statistics');
const ActivityLog = require('./AnctivityLog');


class ToDo{
    constructor() {
        this.userTaskMap = {};
        this.userActivityLogMap = {};
        this.userMap ={};
    }

    addUser(name){
        let user = new User(name);
        this.userMap[user.id] = user;
        return user;
        
    }
    addTask(title, deadline, tags, user, beginDate){
        let task = new Task(title, deadline, tags, user, beginDate);
        let currentTasks = this.userTaskMap[user.id];
        if(!currentTasks){
            currentTasks = [];
        }
        currentTasks.push(task);
        this.userTaskMap[user.id] = currentTasks;
        let currentActivityLog = this.userActivityLogMap[user.id];
        if(!currentActivityLog){
            currentActivityLog = [];
        }
        currentActivityLog.push(new ActivityLog(task, 'ADD', new Date(), user));
        this.userActivityLogMap[user.id] = currentActivityLog;
        return task;
    }


    getTask(taskId,user){
        let tasks = this.userTaskMap[user.id] || [];
        return tasks.find(task => task.id === taskId);
    }

    markCompleted(taskId,user){
        let task = this.getTask(taskId,user);
        if(!task){
            console.log(`Task not found`);
            return;
        }
        task.setCompleted();
        let currentActivityLog = this.userActivityLogMap[user.id];
        if(!currentActivityLog){
            currentActivityLog = [];
        }
        currentActivityLog.push(new ActivityLog(task, 'COMPLETED', new Date(), user));
        this.userActivityLogMap[user.id] = currentActivityLog;
        return task;
    }

    markCancelled(taskId,user){
        let task = this.getTask(taskId,user);
        if(!task){
            console.log(`Task not found`);
            return;
        }
    
        task.setCancelled();
        let currentActivityLog = this.userActivityLogMap[user.id];
        if(!currentActivityLog){
            currentActivityLog = [];
        }
        currentActivityLog.push(new ActivityLog(task, 'CANCELLED', new Date(), user));
        this.userActivityLogMap[user.id] = currentActivityLog;
        return task;
    }
    
    modifyTask(taskId, title, deadline, tags, user, beginDate){
        let task = this.getTask(taskId, user);
        if(!task){
            console.log(`Task not found`);
            return;
        }
        task.update(title, deadline, tags, beginDate);
        return task;
    }

    getTasks(user, filter , sort ){
       let allTasks = this.userTaskMap[user.id] || [];

       let filteredTasks= applyFilter(allTasks,filter);
       if(sort){
        let sortedTasks = applySort(filteredTasks,sort);
        return sortedTasks;
       }
       return filteredTasks;
    }
  

    getStatistics(user, createdAtStartDate, createdAtEndDate){
        let allTasks = this.userTaskMap[user.id] || [];
        return calculateStatistics(allTasks, createdAtStartDate, createdAtEndDate);
    }


    getActivityLog(user, startDate, endDate) { 
        let allActivityLog = this.userActivityLogMap[user.id] || [];
        return allActivityLog.filter(activity => activity.createdAt >= startDate && activity.createdAt <= endDate);


    }

    

}

module.exports = ToDo;