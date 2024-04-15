require "test_helper"

class VersionHistoriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @version_history = version_histories(:one)
  end

  test "should get index" do
    get version_histories_url, as: :json
    assert_response :success
  end

  test "should create version_history" do
    assert_difference("VersionHistory.count") do
      post version_histories_url, params: { version_history: { approve_date: @version_history.approve_date, approved_by: @version_history.approved_by, change: @version_history.change, created_by: @version_history.created_by, project_id: @version_history.project_id, reason: @version_history.reason, revision_date: @version_history.revision_date, version_no: @version_history.version_no, version_type: @version_history.version_type } }, as: :json
    end

    assert_response :created
  end

  test "should show version_history" do
    get version_history_url(@version_history), as: :json
    assert_response :success
  end

  test "should update version_history" do
    patch version_history_url(@version_history), params: { version_history: { approve_date: @version_history.approve_date, approved_by: @version_history.approved_by, change: @version_history.change, created_by: @version_history.created_by, project_id: @version_history.project_id, reason: @version_history.reason, revision_date: @version_history.revision_date, version_no: @version_history.version_no, version_type: @version_history.version_type } }, as: :json
    assert_response :success
  end

  test "should destroy version_history" do
    assert_difference("VersionHistory.count", -1) do
      delete version_history_url(@version_history), as: :json
    end

    assert_response :no_content
  end
end
