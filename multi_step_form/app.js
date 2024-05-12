const supabaseUrl = 'https://pnlkiicdzedyzyzwocsx.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBubGtpaWNkemVkeXp5endvY3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUzOTg3MDQsImV4cCI6MjAzMDk3NDcwNH0.0fihxsMK-Y2s7oMaYHtWU8llACvgILuyoBM-71IoEw8";
const database = supabase.createClient(supabaseUrl, supabaseKey);

console.log(database)

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('#psps');
  form.addEventListener('click', async function(event) {
    event.preventDefault();  // Prevent the default form submission

    const teamname = document.getElementById('teamname').value.trim();
    const teamLeader = document.getElementById('Team_Leader').value.trim();
    const studentName = document.getElementById('student').value.trim();
    const grade = document.getElementById('grade').value.trim();
    const email = document.getElementById('email').value.trim();
    const number = document.getElementById('number').value.trim();
    const info = document.getElementById('info').value.trim();
    const exp = document.getElementById('exp').value.trim();

    if (!teamname || !teamLeader || !studentName || !grade || !email || !number) {
      alert('Please fill in all required fields.');
      return;
    }
    
    try {
      const { data, error } = await database
        .from('participants')
        .insert([
          {
            teamname: teamname,
            Team_Leader: teamLeader,
            Student_Name: studentName,
            grade: grade,
            email: email,
            number: number,
            previous_info: info,
            previous_exp: exp
          }
        ]);
        

        if (error) throw error;
        // Display success message
        alert('Submission successful!');
        // Redirect to main page
        window.location.href = '../index.html?success=true';
      } catch (error) {
        console.error('Error inserting data: ', error);
        alert('Failed to submit form!');
      }
    });
  });
