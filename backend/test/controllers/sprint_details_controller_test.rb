require "test_helper"

class SprintDetailsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @sprint_detail = sprint_details(:one)
  end

  test "should get index" do
    get sprint_details_url, as: :json
    assert_response :success
  end

  test "should create sprint_detail" do
    assert_difference("SprintDetail.count") do
      post sprint_details_url, params: { sprint_detail: { comments: @sprint_detail.comments, end_date: @sprint_detail.end_date, project_id: @sprint_detail.project_id, sprint: @sprint_detail.sprint, start_date: @sprint_detail.start_date, status: @sprint_detail.status } }, as: :json
    end

    assert_response :created
  end

  test "should show sprint_detail" do
    get sprint_detail_url(@sprint_detail), as: :json
    assert_response :success
  end

  test "should update sprint_detail" do
    patch sprint_detail_url(@sprint_detail), params: { sprint_detail: { comments: @sprint_detail.comments, end_date: @sprint_detail.end_date, project_id: @sprint_detail.project_id, sprint: @sprint_detail.sprint, start_date: @sprint_detail.start_date, status: @sprint_detail.status } }, as: :json
    assert_response :success
  end

  test "should destroy sprint_detail" do
    assert_difference("SprintDetail.count", -1) do
      delete sprint_detail_url(@sprint_detail), as: :json
    end

    assert_response :no_content
  end
end
