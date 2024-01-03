using Microsoft.EntityFrameworkCore;

namespace Web.Api.ToDoTasks.Server.Model
{
    //db context class
    public class TaskContext : DbContext
    {
        public TaskContext(DbContextOptions<TaskContext> options): base(options)
        { }

        public DbSet<TaskData> TasksList { get; set; } = null!;


    }
}
