class Statistics {
    constructor(totalTasks,completedTasks,cancelledTasks, spilledOverDeadline){
        this.totalTasks = totalTasks;
        this.completedTasks = completedTasks;
        this.cancelledTasks = cancelledTasks;
        this.spilledOverDeadline = spilledOverDeadline;
    }
}

let calculateStatistics = (tasks, createdAtStartDate, createdAtEndDate) => {
    let totalTasks = tasks.filter(task => task.createdAt >= createdAtStartDate && task.createdAt <= createdAtEndDate).length;
    let completedTasks = tasks.filter(task => task.state === 'COMPLETED' && task.createdAt >= createdAtStartDate && task.createdAt <= createdAtEndDate).length;
    let cancelledTasks = tasks.filter(task => task.state === 'CANCELLED' && task.createdAt >= createdAtStartDate && task.createdAt <= createdAtEndDate).length;
    let spilledOverDeadline = tasks.filter(task => task.state === 'PENDING' && task.deadline < Date.now() && task.createdAt >= createdAtStartDate && task.createdAt <= createdAtEndDate).length;
    return new Statistics(totalTasks,completedTasks,cancelledTasks,spilledOverDeadline);
}

module.exports = {
    calculateStatistics,
    Statistics,
}