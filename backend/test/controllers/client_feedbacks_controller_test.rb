require "test_helper"

class ClientFeedbacksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @client_feedback = client_feedbacks(:one)
  end

  test "should get index" do
    get client_feedbacks_url, as: :json
    assert_response :success
  end

  test "should create client_feedback" do
    assert_difference("ClientFeedback.count") do
      post client_feedbacks_url, params: { client_feedback: { action_taken: @client_feedback.action_taken, closure_date: @client_feedback.closure_date, date_received: @client_feedback.date_received, detailed_feedback: @client_feedback.detailed_feedback, feedback_type: @client_feedback.feedback_type, project_id: @client_feedback.project_id } }, as: :json
    end

    assert_response :created
  end

  test "should show client_feedback" do
    get client_feedback_url(@client_feedback), as: :json
    assert_response :success
  end

  test "should update client_feedback" do
    patch client_feedback_url(@client_feedback), params: { client_feedback: { action_taken: @client_feedback.action_taken, closure_date: @client_feedback.closure_date, date_received: @client_feedback.date_received, detailed_feedback: @client_feedback.detailed_feedback, feedback_type: @client_feedback.feedback_type, project_id: @client_feedback.project_id } }, as: :json
    assert_response :success
  end

  test "should destroy client_feedback" do
    assert_difference("ClientFeedback.count", -1) do
      delete client_feedback_url(@client_feedback), as: :json
    end

    assert_response :no_content
  end
end
