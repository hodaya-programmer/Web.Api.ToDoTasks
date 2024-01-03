using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using System.Threading.Tasks;
using Web.Api.ToDoTasks.Server.Log;
using Web.Api.ToDoTasks.Server.Model;

namespace Web.Api.ToDoTasks.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ToDoTasksController : ControllerBase
    {
        //EF db
        private readonly TaskContext _dbContext;
        public ToDoTasksController(TaskContext dbContext)
        {
            _dbContext = dbContext;
        }

        //get http func
        //params: userName from header
        //return list of user's tasks
        [HttpGet("GetUserTasksList")]
        public async Task<ActionResult<TaskData[]>> Get(string? testUser)
        {
            //call data from header
            Request.Headers.TryGetValue("UserName", out StringValues user);

            //if find UserName from header
            if (user.Count > 0)
            {
                if(_dbContext.TasksList == null)
                {
                    //if haven't items in db
                    return NotFound();
                }
                var list = await _dbContext.TasksList.ToListAsync();

                //search all items that userName equal to hader's user
                return list.FindAll(item => item.UserName == user.First())
                .ToArray();
            }

            //if dont send userName from header
            return BadRequest();
        }

        //post http func - create new task
        //params: data of task from body
        //return ActionResult
        [HttpPost("CreateTask")]
        public async Task<IActionResult> Post([FromBody]TaskData task)
        {
            //check valid data
            if (!string.IsNullOrEmpty(task.UserName) && !string.IsNullOrEmpty(task.Id))
            {
                //create new task in data base
                await _dbContext.TasksList.AddAsync(task);
                await _dbContext.SaveChangesAsync();

                //write to log
                ToDoTasksLogger.Instance.CreateNewTaskLog(task.UserName, task.Title, task.Id);
            }
            else
            {
                //send action anf write to log about error
                ToDoTasksLogger.Instance.LogError("Error with Task's Data", task.Id);
                return BadRequest();
            }
            return NoContent();
        }

        //put http func - update exist task
        //params: data of task from body
        //return ActionResult
        [HttpPut("UpdateTask")]
        public async Task<IActionResult> Put([FromBody] TaskData task)
        {
            //check valid data
            if (!string.IsNullOrEmpty(task.UserName) && !string.IsNullOrEmpty(task.Title))
            {
                //change item state to Modified in db
                _dbContext.Entry(task).State = EntityState.Modified;
                try
                {
                    //try to save db
                    await _dbContext.SaveChangesAsync();
                    //write to log
                    ToDoTasksLogger.Instance.UpdateTaskLog(task.UserName, task.Title, task.Id);

                }
                catch (DbUpdateConcurrencyException e)
                {
                    //write to log and return action
                    ToDoTasksLogger.Instance.LogError("Error with Task's Data id: {1} e: {2}", task.Id, e);
                    return BadRequest();

                }
            }

            return NoContent();
        }

        //delete http func - delete exist task
        //params: userName, taskId from header
        //return ActionResult
        [HttpDelete("DeleteTask")]
        public async Task<IActionResult> Delete(string? idTest)
        {
            //call data from header
            Request.Headers.TryGetValue("TaskId", out StringValues taskId);
            Request.Headers.TryGetValue("UserName", out StringValues user);

            //if find taskId from header
            if (taskId.Count > 0)
            {
                //if haven't items in db
                if (_dbContext.TasksList == null)
                {
                    return NotFound();
                }

                //find task in bd that taskId == header taskId
                var item = await _dbContext.TasksList.FindAsync(taskId.First());

                //if not have in db header taskId
                if (item == null)
                {
                    //write to log and return action
                    ToDoTasksLogger.Instance.LogError("Not found Task with id {0} before delete", taskId.First());
                    return NotFound();
                }

                //if find taskId in db remove the task and save db.
                _dbContext.TasksList.Remove(item);

                await _dbContext.SaveChangesAsync();
                //write to log and return action
                ToDoTasksLogger.Instance.DeleteTaskLog(user.First(), taskId.First());
                return NoContent();
            }
            return BadRequest();
        }
    }
}

