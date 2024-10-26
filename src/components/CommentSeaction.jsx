import React, { useState } from 'react';
import { commentService } from '../api/rest.app';
import { formatDistanceToNow } from 'date-fns';

const CommentsSection = ({ comments, onAddComment, productId }) => {
    const [commentText, setCommentText] = useState('');

    const handleCommentChange = (e) => {
        setCommentText(e.target.value);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (commentText.trim()) {
            commentService.create({
                comment: commentText,
                productId,
            }).then(() => {
                onAddComment({ commentText, productId, createdAt: new Date() });
            })
            setCommentText(''); // Clear the input after submission
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 py-6 shadow-md mt-3 md:mt-6 px-4 md:px-5 rounded-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Comments</h2>
            <form onSubmit={handleCommentSubmit} className="mb-4">
                <textarea
                    value={commentText}
                    onChange={handleCommentChange}
                    placeholder="Add a comment..."
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    rows="4"
                    required
                />
                <button
                    type="submit"
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-200"
                >
                    Submit Comment
                </button>
            </form>
            <div className="space-y-4">
                {comments.map((comment) => {
                    console.log("C ::", comment);
                    const commentDate = new Date(comment.createdAt);
                    return (
                        <div key={comment._id} className="p-4 border rounded-lg shadow-sm bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600">
                            <p className="text-gray-700 dark:text-gray-300">
                                <strong>{comment.userName}</strong> - {formatDistanceToNow(commentDate, { addSuffix: true })}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">{comment.comment}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CommentsSection;
