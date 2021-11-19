import { buildFeedbackPath, extractFeedback } from './feedback';

const handler = function (req, res) {
  const { feedbackId } = req.query;
  const filePath = buildFeedbackPath();
  const feedbackData = extractFeedback(filePath);

  const selectedFeedback = feedbackData.find(data => data.id === feedbackId);
  res.status(200).json({ feedback: selectedFeedback });
};

export default handler;
