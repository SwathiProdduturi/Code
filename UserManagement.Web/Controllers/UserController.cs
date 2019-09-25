using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using UserManagement.EntityFramework;

namespace UserManagement.Web.Controllers
{
	[EnableCors(origins: "*", headers: "*", methods: "*")]
	public class UserController : ApiController
    {
        private UsersDbConnection db = new UsersDbConnection();

        // GET: api/User
        public IQueryable<User> GetUsers()
        {

            return db.Users;
        }
       

        // GET: api/User/5
        [ResponseType(typeof(User))]
        public async Task<IHttpActionResult> GetUser(int id)
        {
            //User user = await db.Users.FindAsync(id);
            User user = await db.Users.Include(i => i.UserNotifications).FirstOrDefaultAsync(i => i.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

		public async Task<IHttpActionResult> AddOrUpdateUser(User user)
		{
			if (user != null && user.Id > 0)
			{
                return await PutUser(user.Id, user);
			}
			else
			{
				return await PostUser(user);
			}
		}

        private async Task<IHttpActionResult> PutUser(int id, User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.Id)
            {
                return BadRequest();
            }

            db.Entry(user).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
				await this.AddNotification("User updated", user.Id);
			}
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        private async Task<IHttpActionResult> PostUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userEntity = db.Users.Add(user);
			await this.AddNotification("User added", userEntity.Id);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = user.Id }, user);
        }

        // DELETE: api/User/5
        [ResponseType(typeof(User))]
        public async Task<IHttpActionResult> DeleteUser(int id)
        {
            User user = await db.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            await db.SaveChangesAsync();

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.Id == id) > 0;
        }

		private async Task<UserNotification> AddNotification(string message, int userId)
		{
			UserNotification userNotification = new UserNotification()
			{
				Message = message,
				UserId = userId
			};
			try
			{

				var userNotificationEntity = db.UserNotifications.Add(userNotification);
				await db.SaveChangesAsync();

				return userNotificationEntity;

			}
			catch (Exception ex)
			{

				throw;
			}

			return null;
		}
    }
}