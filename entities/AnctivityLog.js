
class ActivityLog{
    constructor(task, action, createdAt, user) {
        this.task = {...task};
        this.action = action;
        this.createdAt = createdAt;
        this.user = user;
    }
}




module.exports=ActivityLog;