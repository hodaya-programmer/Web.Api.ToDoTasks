namespace Web.Api.ToDoTasks.Server.Model
{
    public class TaskData
    {
        public TaskData()
        {
        }
        //id of guid
        public string Id { get; set; }

        //user task
        public string UserName { get; set; }

        //execution Date task
        public DateTime ExecutionDate { get; set; }

        //title task
        public string Title { get; set; }

        public string Details { get; set; }

        //for ui only - if open in edit mode
        public bool IsOpen { get; set; }
    }
}
