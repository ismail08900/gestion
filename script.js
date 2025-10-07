let students = JSON.parse(localStorage.getItem('students')) || [];
let editIndex = null;

const form = document.getElementById('studentForm');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const classInput = document.getElementById('class');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const tbody = document.getElementById('studentTable');

function renderTable() {
  tbody.innerHTML = '';
  students.forEach((s, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${s.name}</td>
        <td>${s.age}</td>
        <td>${s.class}</td>
        <td>
          <button onclick="editStudent(${index})">Modifier</button>
          <button onclick="deleteStudent(${index})">Supprimer</button>
        </td>
      </tr>
    `;
  });
}

function deleteStudent(index){
  students.splice(index,1);
  localStorage.setItem('students', JSON.stringify(students));
  renderTable();
}

function editStudent(index){
  editIndex = index;
  nameInput.value = students[index].name;
  ageInput.value = students[index].age;
  classInput.value = students[index].class;
  submitBtn.textContent = 'Enregistrer';
  cancelBtn.classList.remove('hidden');
}

cancelBtn.addEventListener('click', () => {
  form.reset();
  editIndex = null;
  submitBtn.textContent = 'Ajouter';
  cancelBtn.classList.add('hidden');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const studentData = {
    name: nameInput.value,
    age: ageInput.value,
    class: classInput.value
  };
  if(editIndex === null){
    students.push(studentData);
  } else {
    students[editIndex] = studentData;
    editIndex = null;
    submitBtn.textContent = 'Ajouter';
    cancelBtn.classList.add('hidden');
  }
  localStorage.setItem('students', JSON.stringify(students));
  form.reset();
  renderTable();
});

renderTable();
