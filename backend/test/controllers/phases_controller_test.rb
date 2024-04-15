require "test_helper"

class PhasesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @phase = phases(:one)
  end

  test "should get index" do
    get phases_url, as: :json
    assert_response :success
  end

  test "should create phase" do
    assert_difference("Phase.count") do
      post phases_url, params: { phase: { approval_date: @phase.approval_date, comments: @phase.comments, completion_date: @phase.completion_date, project_id: @phase.project_id, revised_completion_date: @phase.revised_completion_date, start_date: @phase.start_date, status: @phase.status, title: @phase.title } }, as: :json
    end

    assert_response :created
  end

  test "should show phase" do
    get phase_url(@phase), as: :json
    assert_response :success
  end

  test "should update phase" do
    patch phase_url(@phase), params: { phase: { approval_date: @phase.approval_date, comments: @phase.comments, completion_date: @phase.completion_date, project_id: @phase.project_id, revised_completion_date: @phase.revised_completion_date, start_date: @phase.start_date, status: @phase.status, title: @phase.title } }, as: :json
    assert_response :success
  end

  test "should destroy phase" do
    assert_difference("Phase.count", -1) do
      delete phase_url(@phase), as: :json
    end

    assert_response :no_content
  end
end
