// import React from 'react'
// import { adminBooksPageStyles as s } from '../assets/dummyStyles';

// const AdminBooksPage = () => {
//   return (
//     <div className={s.pageContainer}>
//         <section className={s.mainSection}>
//             <div className={s.innerContainer}>
//                 <div className={s.headerFlex}>
//                     <h2 className={s.title}>Issue Book To Student</h2>
//                     <p className={s.subtitle}>
//                         Select a student, and manual book entries with book code, and the active
//                         overdue fine rule will be used automatically after the due date.
//                     </p>
//                 </div>
//                 <div className={s.fineRuleBadge}>

//                 </div>
//             </div>

//         </section>
//     </div>
//   )
// }

// export default AdminBooksPage

import React, { useEffect, useRef, useState } from "react";
import { adminBooksPageStyles as s } from "../assets/dummyStyles";
import { useLibrary } from "../shared/LibraryContext";
import { FilePlus2, Search, Trash2 } from "lucide-react";
import { API_BASE_URL } from "../config/api";

const getTodayIso = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const createBookDraft = () => ({
  id: `draft-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
  title: "",
  bookCode: "",
  issuedOn: getTodayIso(),
  dueDate: "",
});

const createInitialForm = () => ({
  studentName: "",
  userEmail: "",
  department: "",
  stream: "",
  academicYear: "",
  semester: "",
  rollNumber: "",
  books: [createBookDraft()],
});

const AdminBooksPage = () => {
  const { issueManualBooksToStudent, fineSettings } = useLibrary();

  const [issueForm, setIssueForm] = useState(createInitialForm);

  const [formMessage, setFormMessage] = useState("");

  const [matchingStudents, setMatchingStudents] = useState([]);

  const [isSearching, setIsSearching] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState(null);

  const [searchError, setSearchError] = useState("");

  const searchTimeoutRef = useRef(null);

  const isStudentSelected = Boolean(selectedStudent);

  const canSearchRoll =
    issueForm.rollNumber.trim().length > 0 && !isStudentSelected;

  // --------------------------------------------------
  // SEARCH STUDENT BY ROLL NUMBER
  // --------------------------------------------------

  useEffect(() => {
    if (!canSearchRoll) {
      setIsSearching(false);
      return;
    }

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    setIsSearching(true);

    searchTimeoutRef.current = window.setTimeout(async () => {
      try {
        setSearchError("");

        const token = localStorage.getItem("library-auth-token");

        const response = await fetch(
          `${API_BASE_URL}/api/students/search-by-roll?roll=${encodeURIComponent(
            issueForm.rollNumber.trim(),
          )}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        const data = await response.json();

        if (response.ok && data.success) {
          setMatchingStudents(data.students || []);
        } else {
          setMatchingStudents([]);

          setSearchError(
            data.message || "Unable to search students by roll number.",
          );
        }
      } catch (error) {
        console.error("Student roll search error:", error);

        setMatchingStudents([]);

        setSearchError("Unable to connect to the backend server.");
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [issueForm.rollNumber, canSearchRoll]);

  // --------------------------------------------------
  // CLEAR SELECTED STUDENT
  // --------------------------------------------------

  const clearSelectedStudent = () => {
    setSelectedStudent(null);

    setMatchingStudents([]);

    setSearchError("");

    setFormMessage("");

    setIssueForm((current) => ({
      ...current,

      studentName: "",
      userEmail: "",
      department: "",
      stream: "",
      academicYear: "",
      semester: "",
      rollNumber: "",
    }));
  };

  // --------------------------------------------------
  // SELECT STUDENT
  // --------------------------------------------------

  const selectStudent = (student) => {
    setFormMessage("");

    setSearchError("");

    setMatchingStudents([]);

    setSelectedStudent(student);

    setIssueForm((current) => ({
      ...current,

      studentName: student.name || "",
      userEmail: student.email || "",
      department: student.department || "",
      stream: student.stream || "",
      academicYear: student.academicYear || student.year || "",
      semester: student.semester || "",
      rollNumber: student.rollNumber || student.rollno || "",
    }));
  };

  // --------------------------------------------------
  // HANDLE FORM INPUT
  // --------------------------------------------------

  const handleIssueChange = (event) => {
    const { name, value } = event.target;

    setFormMessage("");

    if (name === "rollNumber") {
      setSelectedStudent(null);

      setMatchingStudents([]);

      setSearchError("");

      setIsSearching(Boolean(value.trim()));
    }

    setIssueForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // --------------------------------------------------
  // HANDLE BOOK INPUT
  // --------------------------------------------------

  const handleBookChange = (bookId, field, value) => {
    setFormMessage("");

    setIssueForm((current) => ({
      ...current,

      books: current.books.map((book) =>
        book.id === bookId
          ? {
              ...book,
              [field]: value,
            }
          : book,
      ),
    }));
  };

  // --------------------------------------------------
  // ADD BOOK
  // --------------------------------------------------

  const addBookDraft = () => {
    setFormMessage("");

    setIssueForm((current) => ({
      ...current,

      books: [...current.books, createBookDraft()],
    }));
  };

  // --------------------------------------------------
  // REMOVE BOOK
  // --------------------------------------------------

  const removeBookDraft = (bookId) => {
    setFormMessage("");

    setIssueForm((current) => ({
      ...current,

      books:
        current.books.length > 1
          ? current.books.filter((book) => book.id !== bookId)
          : current.books,
    }));
  };

  // --------------------------------------------------
  // SUBMIT ISSUE BOOK
  // --------------------------------------------------

  const handleIssueSubmit = async (event) => {
    event.preventDefault();

    setFormMessage("");

    // Student select check
    if (!issueForm.userEmail) {
      setFormMessage(
        "Please search and select a student by roll number first.",
      );
      return;
    }

    // Book validation
    const invalidBook = issueForm.books.some(
      (book) => !book.title.trim() || !book.bookCode.trim() || !book.dueDate,
    );

    if (invalidBook) {
      setFormMessage(
        "Please complete book name, book code, and due date for every book.",
      );
      return;
    }

    try {
      const result = await issueManualBooksToStudent({
        userEmail: issueForm.userEmail,

        studentDetails: issueForm,

        books: issueForm.books,
      });

      if (!result.ok) {
        setFormMessage(result.error || "Unable to issue books right now.");
        return;
      }

      setFormMessage(
        `${
          result.count || issueForm.books.length
        } book record(s) issued successfully!`,
      );

      setIssueForm(createInitialForm());

      setSelectedStudent(null);

      setMatchingStudents([]);

      setSearchError("");
    } catch (error) {
      console.error("Issue book error:", error);

      setFormMessage(
        "Unable to issue books. Please check your backend server.",
      );
    }
  };

  return (
    <div className={s.pageContainer}>
      <section className={s.mainSection}>
        <div className={s.innerContainer}>
          {/* -------------------------------- */}
          {/* HEADER */}
          {/* -------------------------------- */}

          <div className={s.headerFlex}>
            <div>
              <h2 className={s.title}>Issue Book To Student</h2>

              <p className={s.subtitle}>
                Select a student, and manual book entries with book code, and
                the active overdue fine rule will be used automatically after
                the due date.
              </p>
            </div>

            <div className={s.fineRuleBadge}>
              Fine rule: Rs. {fineSettings?.amount ?? 10} per{" "}
              {fineSettings?.interval ?? "day"}
            </div>
          </div>

          {/* -------------------------------- */}
          {/* FORM */}
          {/* -------------------------------- */}

          <form className={s.form} onSubmit={handleIssueSubmit}>
            {/* -------------------------------- */}
            {/* STUDENT INFORMATION */}
            {/* -------------------------------- */}

            <div className={s.formGrid}>
              {/* Student Name */}

              <label className={s.label}>
                <span className={s.labelSpan}>Student Name</span>

                <div className={s.searchInputWrapper}>
                  <Search className={s.searchIcon} size={16} />

                  <input
                    type="text"
                    name="studentName"
                    value={issueForm.studentName}
                    readOnly
                    placeholder="Selected student name"
                    className={s.readonlyInput}
                  />
                </div>
              </label>

              {/* Department */}

              <label className={s.label}>
                <span className={s.labelSpan}>Department</span>

                <input
                  type="text"
                  name="department"
                  value={issueForm.department}
                  readOnly={isStudentSelected}
                  onChange={handleIssueChange}
                  placeholder="Department"
                  className={s.textInput}
                />
              </label>

              {/* Stream */}

              <label className={s.label}>
                <span className={s.labelSpan}>Stream</span>

                <input
                  type="text"
                  name="stream"
                  value={issueForm.stream}
                  readOnly={isStudentSelected}
                  onChange={handleIssueChange}
                  placeholder="Stream"
                  className={s.textInput}
                />
              </label>

              {/* Year */}

              <label className={s.label}>
                <span className={s.labelSpan}>Year</span>

                <input
                  type="text"
                  name="academicYear"
                  value={issueForm.academicYear}
                  readOnly={isStudentSelected}
                  onChange={handleIssueChange}
                  placeholder="Year"
                  className={s.textInput}
                />
              </label>

              {/* Semester */}

              <label className={s.label}>
                <span className={s.labelSpan}>Semester</span>

                <input
                  type="text"
                  name="semester"
                  value={issueForm.semester}
                  readOnly={isStudentSelected}
                  onChange={handleIssueChange}
                  placeholder="Semester"
                  className={s.textInput}
                />
              </label>

              {/* Roll Number */}

              <label className={s.label}>
                <span className={s.labelSpan}>Roll Number</span>

                <input
                  type="text"
                  name="rollNumber"
                  value={issueForm.rollNumber}
                  readOnly={isStudentSelected}
                  onChange={handleIssueChange}
                  placeholder="Search by roll number"
                  className={s.textInput}
                  // autoComplete="off"
                />
              </label>
            </div>

            {/* -------------------------------- */}
            {/* MATCHING STUDENTS */}
            {/* -------------------------------- */}

            <div className={s.matchingContainer}>
              <p className={s.matchingTitle}>Matching Students</p>

              <div className={s.studentList}>
                {isSearching ? (
                  <span className={s.searchingMessage}>
                    Searching for students...
                  </span>
                ) : matchingStudents.length > 0 ? (
                  matchingStudents.map((student) => (
                    <button
                      key={student.email || student._id || student.id}
                      type="button"
                      onClick={() => selectStudent(student)}
                      className={`${s.studentButtonBase} ${
                        selectedStudent?.email === student.email
                          ? s.studentButtonSelected
                          : s.studentButtonUnselected
                      }`}
                    >
                      <span>{student.name}</span>

                      <span className={s.studentRollSpan}>
                        - {student.rollNumber || student.rollno}
                      </span>
                    </button>
                  ))
                ) : (
                  <p className={s.noMatchText}>
                    {issueForm.rollNumber.trim()
                      ? "No matching students found."
                      : "Type a roll number to search registered students."}
                  </p>
                )}
              </div>

              {searchError && <p className={s.errorText}>{searchError}</p>}

              {selectedStudent && (
                <div className={s.selectedStudentContainer}>
                  <span className={s.selectedStudentBadge}>
                    Selected: {selectedStudent.name} -{" "}
                    {selectedStudent.rollNumber || selectedStudent.rollno}
                  </span>

                  <button
                    type="button"
                    onClick={clearSelectedStudent}
                    className={s.clearButton}
                  >
                    Clear selection
                  </button>
                </div>
              )}
            </div>

            {/* -------------------------------- */}
            {/* BOOK SECTION */}
            {/* -------------------------------- */}

            <div className={s.booksSection}>
              <div className={s.booksHeader}>
                <h3 className={s.booksTitle}>Manual Book Entries</h3>

                <button
                  type="button"
                  onClick={addBookDraft}
                  className={s.addBookButton}
                >
                  <FilePlus2 size={16} />
                  Add Book
                </button>
              </div>

              <div className={s.booksGrid}>
                {issueForm.books.map((book, index) => (
                  <article key={book.id} className={s.bookCard}>
                    {/* BOOK HEADER */}

                    <div className={s.bookCardHeader}>
                      <div className={s.bookIndexWrapper}>
                        <p className={s.bookIndexLabel}>
                          Manual Book {index + 1}
                        </p>

                        <p className={s.bookIndexHelper}>
                          Add book name and code. Issue date is set
                          automatically to today.
                        </p>
                      </div>

                      {issueForm.books.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeBookDraft(book.id)}
                          className={s.deleteButton}
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    {/* BOOK FIELDS */}

                    <div className={s.bookFieldsGrid}>
                      {/* Book Name */}

                      <label className={s.bookFieldLabel}>
                        <span className={s.labelSpan}>Book Name</span>

                        <input
                          type="text"
                          value={book.title}
                          onChange={(event) =>
                            handleBookChange(
                              book.id,
                              "title",
                              event.target.value,
                            )
                          }
                          placeholder="Write book name"
                          className={s.bookFieldInput}
                        />
                      </label>

                      {/* Book Code */}

                      <label className={s.bookFieldLabel}>
                        <span className={s.labelSpan}>Book Code</span>

                        <input
                          type="text"
                          value={book.bookCode}
                          onChange={(event) =>
                            handleBookChange(
                              book.id,
                              "bookCode",
                              event.target.value,
                            )
                          }
                          placeholder="Write book code"
                          className={s.bookFieldInput}
                        />
                      </label>

                      {/* DATES */}

                      <div className={s.dateGrid}>
                        {/* Issue Date */}

                        <label className={s.bookFieldLabel}>
                          <span className={s.labelSpan}>Issue Date</span>

                          <input
                            type="date"
                            value={book.issuedOn}
                            readOnly
                            disabled
                            className={s.dateInputDisabled}
                          />
                        </label>

                        {/* Due Date */}

                        <label className={s.bookFieldLabel}>
                          <span className={s.labelSpan}>Due Date</span>

                          <input
                            type="date"
                            value={book.dueDate}
                            onChange={(event) =>
                              handleBookChange(
                                book.id,
                                "dueDate",
                                event.target.value,
                              )
                            }
                            min={getTodayIso()}
                            className={s.dateInput}
                          />
                        </label>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* -------------------------------- */}
            {/* MESSAGE */}
            {/* -------------------------------- */}

            {formMessage && <div className={s.formMessage}>{formMessage}</div>}

            {/* -------------------------------- */}
            {/* SUBMIT BUTTON */}
            {/* -------------------------------- */}

                <button type="submit" className={s.submitButton}>
                  Issue Manual Books
                </button>
            
          </form>
        </div>
      </section>
    </div>
  );
};

export default AdminBooksPage;
