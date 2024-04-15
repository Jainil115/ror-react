require "test_helper"

class AuditHistoriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @audit_history = audit_histories(:one)
  end

  test "should get index" do
    get audit_histories_url, as: :json
    assert_response :success
  end

  test "should create audit_history" do
    assert_difference("AuditHistory.count") do
      post audit_histories_url, params: { audit_history: { action_item: @audit_history.action_item, date: @audit_history.date, project_id: @audit_history.project_id, queries: @audit_history.queries, reviewed_by: @audit_history.reviewed_by, reviewed_section: @audit_history.reviewed_section, status: @audit_history.status } }, as: :json
    end

    assert_response :created
  end

  test "should show audit_history" do
    get audit_history_url(@audit_history), as: :json
    assert_response :success
  end

  test "should update audit_history" do
    patch audit_history_url(@audit_history), params: { audit_history: { action_item: @audit_history.action_item, date: @audit_history.date, project_id: @audit_history.project_id, queries: @audit_history.queries, reviewed_by: @audit_history.reviewed_by, reviewed_section: @audit_history.reviewed_section, status: @audit_history.status } }, as: :json
    assert_response :success
  end

  test "should destroy audit_history" do
    assert_difference("AuditHistory.count", -1) do
      delete audit_history_url(@audit_history), as: :json
    end

    assert_response :no_content
  end
end
