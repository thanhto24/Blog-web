// ReportModal.js
import React from 'react';

const ReportModal = ({ show, handleClose, handleReport }) => {
  if (!show) return null; // If not shown, render nothing

  const handleSubmit = (event) => {
    event.preventDefault();
    const reportReason = event.target.reportReason.value;
    handleReport(reportReason); // Pass the reason to the parent
    handleClose(); // Close the modal
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={handleClose}></div>
      
      {/* Modal */}
      <div className="fixed inset-1/2 z-50 h-60 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-gradient-to-b from-slate-200 to-cyan-900 shadow-lg">
        <div className="flex justify-between items-center p-4 border-b border-amber-900">
          <h2 className="text-2xl font-semibold text-black">Report Post</h2>
          <button className="text-black hover:text-gray-600 text-lg" onClick={handleClose}>X</button>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label htmlFor="reportReason" className="block text-lg font-medium text-black">
              Reason for Reporting:
            </label>
            <select id="reportReason" name="reportReason" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 text-lg">
              <option value="">Select a reason</option>
              <option value="Inappropriate Content">Inappropriate Content</option>
              <option value="Spam">Spam</option>
              <option value="Harassment">Harassment</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={handleClose} className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 text-lg">Close</button>
            <button type="submit" className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 text-lg">Submit Report</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReportModal;
