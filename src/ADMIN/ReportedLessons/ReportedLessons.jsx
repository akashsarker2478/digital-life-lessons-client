
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaTrashAlt, FaEye, FaSpinner, FaTimes } from "react-icons/fa";

const ReportedLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [reportedLessons, setReportedLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState(null); 

  useEffect(() => {
    const fetchReportedLessons = async () => {
      try {
        setLoading(true);

        //report and lessons fetch
        const [reportsRes, lessonsRes] = await Promise.all([
          axiosSecure.get("/reports"),
          axiosSecure.get("/lessons/public"),
        ]);

        const reports = reportsRes.data;
        const lessons = lessonsRes.data;

        // Lesson-wise report group 
        const lessonReportMap = {};
        reports.forEach((report) => {
          const lessonId = report.lessonId.toString();
          if (!lessonReportMap[lessonId]) {
            lessonReportMap[lessonId] = [];
          }
          lessonReportMap[lessonId].push({
            reason: report.reason,
            reportedBy: report.reportedBy,
            createdAt: new Date(report.createdAt).toLocaleString(),
          });
        });

        // only filter reported lessons
        const filtered = lessons
          .filter((lesson) => lessonReportMap[lesson._id])
          .map((lesson) => ({
            ...lesson,
            _id: lesson._id.toString(),
            reports: lessonReportMap[lesson._id],
            reportCount: lessonReportMap[lesson._id].length,
          }))
          .sort((a, b) => b.reportCount - a.reportCount); 

        setReportedLessons(filtered);
      } catch (err) {
        console.error("Error fetching reported lessons:", err);
        Swal.fire("Error!", "Failed to load reported lessons.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchReportedLessons();
  }, [axiosSecure]);

  const handleDeleteLesson = (lesson) => {
    Swal.fire({
      title: "Delete Lesson?",
      text: `"${lesson.title}" will be permanently deleted along with all reports!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/lessons/${lesson._id}`)
          .then(() => {
            Swal.fire("Deleted!", "Lesson and reports removed.", "success");
            setReportedLessons((prev) => prev.filter((l) => l._id !== lesson._id));
          })
          .catch(() => Swal.fire("Error!", "Failed to delete.", "error"));
      }
    });
  };

  const handleIgnoreReports = (lesson) => {
    Swal.fire({
      title: "Ignore Reports?",
      text: `All reports for "${lesson.title}" will be cleared.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, Ignore",
    }).then((result) => {
      if (result.isConfirmed) {
        // report delete 
        axiosSecure
          .delete(`/reports/lesson/${lesson._id}`) 
          .then(() => {
            Swal.fire("Ignored!", "Reports cleared.", "success");
            setReportedLessons((prev) => prev.filter((l) => l._id !== lesson._id));
          })
          .catch(() => Swal.fire("Error!", "Failed to ignore reports.", "error"));
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <FaSpinner className="animate-spin text-5xl text-red-600" />
        <span className="ml-4 text-xl">Loading Reported Lessons...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
          Reported Lessons
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Review community-reported content and take action
        </p>
      </div>

      {reportedLessons.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-500">No reported lessons found 🎉</p>
          <p className="text-gray-400 mt-2">Your community is doing great!</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
          <table className="w-full text-left">
            <thead className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
              <tr>
                <th className="p-4">Lesson Title</th>
                <th className="p-4">Author</th>
                <th className="p-4 text-center">Report Count</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reportedLessons.map((lesson) => (
                <tr key={lesson._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium max-w-md truncate">{lesson.title}</td>
                  <td className="p-4 text-gray-600">{lesson.createdBy}</td>
                  <td className="p-4 text-center">
                    <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full font-bold">
                      {lesson.reportCount}
                    </span>
                  </td>
                  <td className="p-4 flex gap-3 justify-center">
                    <button
                      onClick={() => setSelectedLesson(lesson)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
                    >
                      <FaEye /> View Reports
                    </button>
                    <button
                      onClick={() => handleIgnoreReports(lesson)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                    >
                      Ignore
                    </button>
                    <button
                      onClick={() => handleDeleteLesson(lesson)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2"
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Viewing Reports */}
      {selectedLesson && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold">Reports for: {selectedLesson.title}</h2>
              <button
                onClick={() => setSelectedLesson(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-2xl" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {selectedLesson.reports.map((report, idx) => (
                <div key={idx} className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <p className="font-semibold">Reason:</p>
                  <p className="text-gray-700 mb-2">"{report.reason}"</p>
                  <p className="text-sm text-gray-600">
                    Reported by: <span className="font-medium">{report.reportedBy}</span>
                  </p>
                  <p className="text-sm text-gray-500">At: {report.createdAt}</p>
                </div>
              ))}
            </div>
            <div className="p-6 border-t flex justify-end gap-4">
              <button
                onClick={() => handleIgnoreReports(selectedLesson)}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Ignore All Reports
              </button>
              <button
                onClick={() => {
                  setSelectedLesson(null);
                  handleDeleteLesson(selectedLesson);
                }}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete Lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportedLessons;