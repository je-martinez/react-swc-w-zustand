import useCommentModal from "../../hooks/useCommentModal";
import { Comment } from "../../types";
import ImageWithPlaceholder from "../image-with-placeholder";

interface CommentsModalProps {
  comments: Comment[];
  isOpen: boolean;
  onClose: () => void;
}

const CommentsModal = ({ comments, isOpen, onClose }: CommentsModalProps) => {
  useCommentModal(isOpen);

  const getUsername = (email: string) => {
    return email.split("@")[0].toLowerCase();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800 rounded-lg w-full max-w-md p-6">
            <button
              className="text-gray-500 hover:text-black text-2xl float-right"
              onClick={() => onClose()}
            >
              &times;
            </button>
            <div className="mt-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex items-center space-x-4 border-b border-gray-200 pb-2"
                >
                  <ImageWithPlaceholder
                    src={`https://avatar.iran.liara.run/public?username=${comment.email}`}
                    alt={`${comment.email} avatar`}
                    className="min-w-10 min-h-10 w-10 h-10 rounded-full "
                  />
                  <div className="text-gray-900 dark:text-white">
                    <strong className="text-blue-500">
                      @{getUsername(comment.email)}:
                    </strong>{" "}
                    {comment.body}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentsModal;
