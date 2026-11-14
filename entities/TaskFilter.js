class TaskFilter{
    constructor(createdAtStartDate,createdAtEndDate,tags,status){
        this.createdAtStartDate = createdAtStartDate;
        this.createdAtEndDate = createdAtEndDate;
        this.tags = tags;
        this.status = status;
    }
}
class SortCriteris{
    constructor(sortBy,sortOrder){
        this.sortBy = sortBy;
        this.sortOrder = sortOrder;
    }

}

let applyFilter = (tasks, filter) => {  
    if(tasks.length === 0 || !filter){
        tasks = tasks.filter(task=>task.state!='COMPLETED')
        .filter(task=>!task.beginDate || task.beginDate<=Date.now());
        return tasks;
    }
    if(filter.createdAtStartDate && filter.createdAtEndDate){
        tasks = tasks.filter(task => task.createdAt >= filter.createdAtStartDate
            && task.createdAt <= filter.createdAtEndDate);
    }
    if(filter.tags){
        tasks = tasks.filter(task => task.tags.some(tag => filter.tags.includes(tag)));
    }
    if(filter.status){
        tasks = tasks.filter(task => task.state === filter.status);
    }
    else{
        tasks = tasks.filter(task=>task.state!='COMPLETED');
    }
    return tasks.filter(task=>!task.beginDate || task.beginDate<=Date.now());
}



let applySort = (tasks, sort) => {
    if(tasks.length === 0){
        return tasks;
    }
    let task = tasks[0];
    if(!Object.keys(task).includes(sort.sortBy)){
        console.log(`Sort by not found`);
        return tasks;
    }
    return tasks.sort((a,b) => {
        if(sort.sortOrder === 'ASC'){
            return a[sort.sortBy] - b[sort.sortBy];
        }
        return b[sort.sortBy] - a[sort.sortBy];
    });
}

module.exports = {
    applyFilter,
    TaskFilter,
    applySort,
    SortCriteris,
}