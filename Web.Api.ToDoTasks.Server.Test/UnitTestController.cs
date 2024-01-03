using Microsoft.EntityFrameworkCore;
using Moq;
using System.Reflection.Metadata;
using Web.Api.ToDoTasks.Server.Controllers;
using Web.Api.ToDoTasks.Server.Model;

namespace Web.Api.ToDoTasks.Server.Test
{
    public class UnitTestController
    {
        public UnitTestController()
        {
        }
        [Fact]
        public void Test1()
        {
            var mockSet = new Mock<DbSet<TaskData>>();

            var taskContext = new Mock<TaskContext>();

            var controller = new ToDoTasksController(taskContext.Object);

            var t1 = new TaskData();
            t1.UserName = "Test";
            t1.Id = Guid.NewGuid().ToString();

            var t2 = new TaskData();
            t1.UserName = "Test";
            t1.Id = Guid.NewGuid().ToString();

            controller.Post(t1);
            controller.Post(t2);

            var tasksListResult = controller.Get("Test");

            //assert

            //check post and get func
            Assert.NotNull(tasksListResult);
            Assert.Equal(tasksListResult.Result.Value.Count(), 2);

            t1.Details = "to de unit test";

            controller.Put(t1);

            tasksListResult = controller.Get("Test");

            foreach (var task in tasksListResult.Result.Value)
            {
                if(task.Id == t1.Id)
                {
                    //check put func
                    Assert.NotEmpty(task.Details);
                }
            }

            //check delete func
            controller.Delete(t1.Id);
            tasksListResult = controller.Get("Test");
            Assert.Equal(tasksListResult.Result.Value.Count(), 1);

        }
    }
}