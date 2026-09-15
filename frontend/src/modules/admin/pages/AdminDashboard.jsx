const AdminDashboard = () => {


  return (

    <div className="space-y-6">


      <div>

        <h1 className="text-4xl font-black text-slate-900">
          Admin Dashboard
        </h1>


        <p className="mt-2 text-slate-500">
          Manage MyMail platform users, projects and emails.
        </p>

      </div>



      <div className="grid gap-6 md:grid-cols-4">


        <div className="rounded-2xl bg-white p-6 shadow">

          <p className="text-sm text-slate-500">
            Total Users
          </p>

          <h2 className="mt-3 text-4xl font-black">
            0
          </h2>

        </div>



        <div className="rounded-2xl bg-white p-6 shadow">

          <p className="text-sm text-slate-500">
            Projects
          </p>

          <h2 className="mt-3 text-4xl font-black">
            0
          </h2>

        </div>



        <div className="rounded-2xl bg-white p-6 shadow">

          <p className="text-sm text-slate-500">
            Emails Sent
          </p>

          <h2 className="mt-3 text-4xl font-black">
            0
          </h2>

        </div>



        <div className="rounded-2xl bg-white p-6 shadow">

          <p className="text-sm text-slate-500">
            Active Templates
          </p>

          <h2 className="mt-3 text-4xl font-black">
            0
          </h2>

        </div>


      </div>


    </div>

  );

};



export default AdminDashboard;