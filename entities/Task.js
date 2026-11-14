const { v4: uuidv4 } = require('uuid');

class Task {
    constructor(title, deadline, tags, user, beginDate) {
        this.id = uuidv4();
        this.title = title;
        this.deadline = deadline;
        this.tags = tags;
        this.state = 'PENDING';
        this.createdAt = new Date();
        this.completedAt = null;
        this.cancelledAt = null;
        this.createdBy=user;
        this.beginDate = beginDate;
        this.updatedAt = this.createdAt;
    }

    setCompleted(){
        this.state = 'COMPLETED';
        this.completedAt = new Date();
        this.updatedAt = this.completedAt;
    }
    setCancelled(){
        this.state = 'CANCELLED';
        this.cancelledAt = new Date();
        this.updatedAt = this.cancelledAt;
    }

    update(title, deadline, tags, beginDate){
        this.title = title;
        this.deadline = deadline;
        this.tags = tags;
        this.beginDate = beginDate;
        this.updatedAt = new Date();
    }
}



module.exports=Task;